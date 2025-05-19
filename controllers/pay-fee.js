import Lawyer from "../models/lawyer.js"
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import Transaction from "../models/transaction.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function PayFee(req,res){
    try{
        const { amount, name, email, enrolmentId, phoneNumber } = req.body

        const lawyer = await Lawyer.findOne({ enrolmentNumber: enrolmentId })

        const paymentLink = await razorpay.paymentLink.create({
            amount: amount,
            currency: 'INR',
            customer:{
                name, email, contact: phoneNumber
            },
            notify: { email: true, sms: true },
            callback_url: 'https://bba-tawny.vercel.app/pay-fee',
            notes: {
                email: email
            }
        });

        const newTransaction = new Transaction({
            lawyer: lawyer._id,
            fee: amount,
            status: false,
            email: email,
            type: "membership",
            enrolmentNumber: lawyer.enrolmentNumber,
            timestamp: new Date().toISOString()
        })

        await newTransaction.save()

        return res.status(200).json({ url: paymentLink.short_url });

    } catch(error){
        return res.status(500).json({ message: "Internal Server Error", error })
    }

}