import 'dotenv/config'
import nodemailer from 'nodemailer';
import CONTACT_TEMPLATE from "../templates/contact-template.js"

export default async function ContactForm(req,res) {
    
    try {
        
          const { name, email, message } = req.body

          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASSKEY
              }
        });

        const msg = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: "INCOMING CONTACT REQUEST",
            text: 'Hey Admin! You have got an incoming contact request',
            html: CONTACT_TEMPLATE.replace("{name}", name).replace("{email}", email).replace("{message}", message), // also the message to be included here
        };
        
        const response = await transporter.sendMail(msg)

          
          res.status(200).json({ message: "success" });

      } catch(error){
          res.status(500).json({ message: 'error', error });
          console.log(error)
      }
    
}