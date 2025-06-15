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

// how will razorpay redirect if payment is  failed? because redirecting page is happening on frontend

export default async function RazorPayWebhook(req,res){
    try{
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const payload = req.body; //JSON.stringify(req.body);
        const signature = req.headers['x-razorpay-signature'];
        const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex');

        //const isValid = razorpay.validateWebhookSignature(payload.toString(), signature, secret);

         if (expectedSignature !== signature) {
          console.log("The payload: ", payload)
          console.log("The expected signature :", expectedSignature)
          console.log("The signature I received :", signature)
          // console.log("Use razorpay to check Validity: ", isValid)
          
          console.log("Invalid signature!")
          return res.status(400).json({ message: 'Invalid signature' });
        }

        const event = JSON.parse(payload.toString());
        console.log("THE EVENT : ", event)
        //const event = req.body;

        // now handle the event for failed payment
        /*if (event.event === 'payment_link.failed') {

            console.log("EVENT DETAILS: ", event)
            const paymentLink = event.payload.payment_link.entity;
            const email = paymentLink.notes.email;
            console.log("payment link: ", paymentLink, "email : ", email)
            const transaction = await Transaction.findOne({ email, status: false });
            if (!transaction) {
              console.log("Transaction Not Found!", email)
              return res.status(404).json({ message: 'Transaction not found' })
            }
            transaction.status = false;
            transaction.paymentId = paymentLink.id;
            transaction.transactionId = paymentLink.id;
            await transaction.save();
            console.log("Transaction updated: ", transaction)
            return res.status(403).json({ message: "success" });
        }*/

        if (event.event === 'payment_link.paid') {
            console.log("EVENT DETAILS: ", event)
            const payment = event.payload.payment.entity;
            const paymentLink = event.payload.payment_link.entity;
            const email = event.payload.payment_link.entity.notes.email;
            const enrolmentId = event.payload.payment_link.entity.notes.enrolmentId

            console.log("payment: ", payment, " link: ", paymentLink, "email : ", email)
            const transaction = await Transaction.findOne({ email, status: false });
            if (!transaction) {
              console.log("Transaction Not Found!", email)
              return res.status(404).json({ message: 'Transaction not found' })
            }

            console.log("Transaction type: ", transaction.type)
            const lawyer = await Lawyer.findOne({ email: email });
            if (!lawyer) {
              console.log("Lawyer Not Found!")
              return res.status(404).json({ message: 'Lawyer not found' });
            }

            console.log("The lawyer id: ", lawyer._id)

            // CREATES RECEIPT

            const receiptPath = path.resolve('receipt.pdf');
            const receiptBytes = fs.readFileSync(receiptPath);
            const receiptDoc = await PDFDocument.load(receiptBytes);
            const receiptPage = receiptDoc.getPages()[0];
            receiptPage.drawText(`${paymentLink.id}`, { x: 100, y: 685,  size: 10 });
            receiptPage.drawText(`${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`, { x: 90, y: 655,  size: 10 });
            receiptPage.drawText(`${paymentLink.id}`, { x: 130, y: 598,  size: 10 });
            receiptPage.drawText(`${lawyer.username}`, { x: 100, y: 500,  size: 10 });
            receiptPage.drawText(`${enrolmentId}`, { x: 130, y: 470,  size: 10 });
            receiptPage.drawText(`${lawyer.phone}`, { x: 100, y: 440,  size: 10 });
            receiptPage.drawText(`${transaction.fee}`, { x: 320, y: 370,  size: 10 });
            receiptPage.drawText(`${transaction.fee}`, { x: 320, y: 340,  size: 10 });
            receiptPage.drawText(`successful`, { x: 120, y: 570,  size: 10 });
            receiptPage.drawText(`online`, { x: 140, y: 625,  size: 10 });
            receiptPage.drawText(`${transaction.type}`, { x: 80, y: 370,  size: 10 });

            const filledReceiptBytes = await receiptDoc.save();
            const filledReceiptPath = `./receipt-${Date.now()}.pdf`;
            fs.writeFileSync(filledReceiptPath, filledReceiptBytes);

            // UPLOADS PDF TO CLOUDINARY

            const uploadReceipt = await cloudinary.uploader.upload(filledReceiptPath, {
                folder: 'pdfs',
                resource_type: 'raw',
                type: 'upload',
              });

            fs.unlinkSync(filledReceiptPath);

            // Fill PDF
            if(transaction.type == "vakalatnama"){

              const pdfPath = path.resolve('vakalatnama-form.pdf');
              const pdfBytes = fs.readFileSync(pdfPath);
              const pdfDoc = await PDFDocument.load(pdfBytes);
              const form = pdfDoc.getForm();
              const pages = pdfDoc.getPages();
            
              const firstPage = pages[0];
              const formattedDate = `${dd}/${mm}/${yy}`;

              firstPage.drawText(`${transaction.courtName}`, { x: 201, y: 901, size: 12 });
              firstPage.drawText(`${transaction.appealNumber}`, { x: 201, y: 881,  size: 10 });
              firstPage.drawText(`${transaction.representing}`, { x: 100, y: 838,  size: 10 });
              firstPage.drawText(`${transaction.versus}`, { x: 100, y: 771,  size: 10 });
              firstPage.drawText(`${paymentLink.id}`, { x: 490, y: 972,  size: 10 });
              firstPage.drawText(`${new Date(transaction.timestamp).toLocaleDateString('en-US', { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' })}`, { x: 490, y: 992,  size: 10 });
            //  firstPage.drawText(`Day`, { x: 230, y: 170,  size: 10 });

              const today = new Date();

              const dd = String(today.getDate()).padStart(2, '0');
              const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
              const yy = String(today.getFullYear()).slice(-2); // Get last 2 digits

            
              firstPage.drawText(`${formattedDate}`, { x: 340, y: 170,  size: 10 }); //
            
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
              transaction.receipt = uploadReceipt.secure_url
              
              await transaction.save();
              console.log("PDF LINK: ", upload.secure_url)
              console.log(transaction)
              
            } else if(transaction.type == "membership"){

                transaction.status = true;
                transaction.paymentId = payment.id;
                transaction.transactionId = paymentLink.id;
                transaction.receipt = uploadReceipt.secure_url
              
                await transaction.save();

                await Lawyer.findByIdAndUpdate(lawyer._id, { $set: { membership: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString() } }, { new: true })
                console.log(transaction, "membership updated for lawyer: ", transaction.status)
            }

        }

        return res.status(200).json({ message: "success" });

    } catch(error){
        console.log("Error: ", error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }

}