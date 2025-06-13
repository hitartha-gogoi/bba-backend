import Link from "../models/link.js"
import 'dotenv/config';

export default async function CreatePDF(req,res) {
    
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
          const { title, description, category, type } = req.body
                  
          const fileUrl = req.file.path
              
          const newLink = new Link({
              title: title,
              description: description,
              link: fileUrl,
              category: category,
              type: type,
              timestamp: new Date().toISOString(),
          })

          await newLink.save()

          return res.status(200).json({ message: "success" });

      } catch(error){
          console.log(error)
          return res.status(500).json({ message: 'error', error }); 
      }

}