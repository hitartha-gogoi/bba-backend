import Lawyer from "../models/lawyer.js"
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import cloudinary from "../config/cloudinary.js"
import { PDFDocument } from 'pdf-lib';
import { createHmac } from 'crypto';
import Transaction from "../models/transaction.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function RazorPayWebhook(req,res){
    try{
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const payload = JSON.stringify(req.body);
        const signature = req.headers['x-razorpay-signature'];
        const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex');

         if (expectedSignature !== signature) {
            console.log("Invalid signature!")
            return res.status(400).json({ message: 'Invalid signature' });
        }

        const event = req.body;

        if (event.event === 'payment_link.paid') {
            console.log("EVENT DETAILS: ", event)
            const payment = event.payload.payment.entity;
            const paymentLink = event.payload.payment_link.entity;
            const email = event.payload.payment_link.entity.notes.email;

            console.log("payment: ", payment, " link: ", paymentLink, "email : ", email)
            const transaction = await Transaction.findOne({ email, status: false });
            if (!transaction) {
              console.log("Transaction Not Found!", email)
              return res.status(404).json({ message: 'Transaction not found' })
            }

            const lawyer = await Lawyer.findOne({ email: email });
            if (!lawyer) {
              console.log("Lawyer Not Found!")
              return res.status(404).json({ message: 'Lawyer not found' });
            }

            // Fill PDF
            if(transaction.type == "vakalatnama"){

              const pdfPath = path.resolve('vakalatnama-form.pdf');
              const pdfBytes = fs.readFileSync(pdfPath);
              const pdfDoc = await PDFDocument.load(pdfBytes);
              const form = pdfDoc.getForm();
              const pages = pdfDoc.getPages();
            
              const firstPage = pages[0];
              firstPage.drawText(`${transaction.courtName}`, { x: 201, y: 901, size: 12 });
              firstPage.drawText(`${transaction.appealNumber}`, { x: 201, y: 881,  size: 10 });
              firstPage.drawText(`Day`, { x: 230, y: 170,  size: 10 });

              const today = new Date();

              const dd = String(today.getDate()).padStart(2, '0');
              const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
              const yy = String(today.getFullYear()).slice(-2); // Get last 2 digits

              const formattedDate = `${dd}/${mm}/${yy}`;
              firstPage.drawText(`${formattedDate}`, { x: 340, y: 170,  size: 10 });
            
              const filledPdfBytes = await pdfDoc.save();
              const filledPdfPath = `./filled-${Date.now()}.pdf`;
              fs.writeFileSync(filledPdfPath, filledPdfBytes);

              // Upload to Cloudinary
              const upload = await cloudinary.uploader.upload(filledPdfPath, {
                folder: 'pdfs',
                resource_type: 'raw',
                type: 'upload',
              });
           
              fs.unlinkSync(filledPdfPath);

              transaction.pdf = upload.secure_url;
              transaction.status = true;
              transaction.paymentId = payment.id;
              transaction.transactionId = paymentLink.id;

              console.log("PDF LINK: ", upload.secure_url)
              
              await transaction.save();
              console.log("PDF LINK: ", upload.secure_url)
              console.log(transaction)

            } else if(transaction.type == "membership"){

                transaction.status = true;
                transaction.paymentId = payment.id;
                transaction.transactionId = paymentLink.id;
              
                await transaction.save();
                console.log(transaction)
            }

        }

        return res.status(200).json({ message: "success" });

    } catch(error){
        console.log("Error: ", error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }

}