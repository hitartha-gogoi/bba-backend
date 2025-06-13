import Lawyer from "../models/lawyer.js"
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Transaction from "../models/transaction.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function PayFee(req,res){
    try{

        const { amount, name, email, enrolmentId, phoneNumber, paymentType } = req.body

        const lawyer = await Lawyer.findOne({ enrolmentNumber: enrolmentId })

        const paymentLink = await razorpay.paymentLink.create({
            amount: amount * 100,
            currency: 'INR',
            customer:{
                name, email, contact: String(phoneNumber)
            },
            notify: { email: true, sms: true },
            callback_url: `https://bba-tawny.vercel.app/vakalatnama?enrolmentId=${enrolmentId}`,
            notes: {
                email: email,
                enrolmentId: enrolmentId
            }
        });

        if(paymentType == "vakalatnama"){

            const newTransaction = new Transaction({
            lawyer: lawyer._id,
            fee: amount,
            status: false,
            email: email,
            type: paymentType,
            caseTitle: req.body.caseTitle,
            appealNumber: req.body.appealNumber,
            courtName: req.body.courtName,
            representing: req.body.representing,
            versus: req.body.versus,
            phoneNumber: phoneNumber,
            enrolmentNumber: lawyer.enrolmentNumber,
            timestamp: new Date().toISOString()
        })

        await newTransaction.save()


        return res.status(200).json({ url: paymentLink.short_url });

        } else if(paymentType == "membership"){

            const newTransaction = new Transaction({
            lawyer: lawyer._id,
            fee: amount,
            status: false,
            email: email,
            phoneNumber: phoneNumber,
            type: paymentType,
            enrolmentNumber: lawyer.enrolmentNumber,
            timestamp: new Date().toISOString()
        })

        await newTransaction.save()

        // use date object to increment the membership by 1 year

        

        return res.status(200).json({ url: paymentLink.short_url });


        }

        
    } catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }

}