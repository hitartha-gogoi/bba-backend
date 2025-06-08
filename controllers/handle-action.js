import 'dotenv/config'
import nodemailer from 'nodemailer';
import ACTION_HANDLER_TEMPLATE from "../templates/handle-action.js"

export default async function HandleAction(req,res) {
    
    try {
        
          const { actionHandler, action } = req.body

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
            subject: "ACTION",
            text: 'Hey Admin! An action has been performed',
            html: ACTION_HANDLER_TEMPLATE({
              actionHandler: actionHandler, // e.g. Admin John
              action: action,  // e.g. "Updated Secretary image"
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })
            }),
        };

        //new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        
        const response = await transporter.sendMail(msg)

          
          res.status(200).json({ message: "success" });

      } catch(error){
          res.status(500).json({ message: 'error', error });
          console.log(error)
      }
    
}