import Lawyer from "../models/lawyer.js"
import 'dotenv/config'
import crypto from 'crypto';

export default async function CreateLawyer(req,res) {
    
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
          const { username, email, description, phone, address, enrolmentNumber, membership, fatherName } = req.body
  
          const fileUrl = req.file.path
          
          const existingLawyer = await Lawyer.findOne({ $or: [{ email: email }, { username: username }]  });
          if (existingLawyer) {
            console.log("Lawyer already exists!")
            
              return res.status(400).json({ message: 'Lawyer already exists' });
          }

          const generateOtp = () => {
            return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
          };
          
          const otp = generateOtp();
              
          const newLawyer = new Lawyer({
              username: username,
              email: email,
              photo: fileUrl,
              description: description,
              phone: Number(phone),
              timestamp: new Date().toISOString(),
              status: true,
              address: address,
              fatherName: fatherName,
              enrolmentNumber: enrolmentNumber,
              membership: membership,
              otp: otp
          })
  
          await newLawyer.save()

          res.status(200).json({ message: "success" });
          
      } catch(error){
          res.status(500).json({ message: 'error', error });
          console.log(error)
      }
    
}