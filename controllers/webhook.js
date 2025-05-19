import Lawyer from "../models/lawyer.js"
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { broadcast } from './sse-clients.js';
import { clients } from './sse-clients.js';
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
            const pdfPath = path.resolve('vakalatnama-form.pdf');
            const pdfBytes = fs.readFileSync(pdfPath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const form = pdfDoc.getForm();
            
            form.getTextField('Text1').setText(lawyer.name); // customize field names
            form.getTextField('Text2').setText(transaction.enrolmentNumber);
            form.getTextField('Text3').setText(payment.created_at.toString());
            form.flatten();
            
            const filledPdfBytes = await pdfDoc.save();
            const filledPdfPath = `./filled-${Date.now()}.pdf`;
            fs.writeFileSync(filledPdfPath, filledPdfBytes);

           // Upload to Cloudinary
           const upload = await cloudinary.uploader.upload(filledPdfPath, {
            folder: 'pdfs',
            resource_type: 'raw'
           });
           
           fs.unlinkSync(filledPdfPath); // cleanup

          // Update transaction
         transaction.status = true;
         transaction.paymentId = payment.id;
         transaction.transactionId = paymentLink.id;
         transaction.pdf = upload.secure_url;
         await transaction.save();

         console.log("PDF LINK: ", upload.secure_url)
         console.log(transaction)

         // Notify all connected clients
         clients.forEach(c => {
           c.write(`data: ${JSON.stringify({
           message: 'Payment Successful',
           pdf: transaction.pdf,
           name: lawyer.name,
           success: true,
           timestamp: transaction.timestamp,
           enrolmentNumber: transaction.enrolmentNumber
         })}\n\n`);
        });
        
        }

        return res.status(200).json({ message: "success" });

    } catch(error){
        console.log("Error: ", error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }

}