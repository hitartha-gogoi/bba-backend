import Link from "../models/link.js"
import 'dotenv/config';

export default async function CreateGalleryImage(req,res) {
    
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
          const { title, description, category, type } = req.body

          // ✅ Enforce max limit of 20 for photo + carousels-1
                    if (type === 'photo' && category === 'carousels-1') {
                      const photoCount = await Link.countDocuments({
                          type: 'photo',
                          category: 'carousels-1',
                      })
                      
                      if (photoCount >= 1000) {
                          return res.status(403).json({
                              message: 'Limit reached: Only 20 photos allowed in carousels-1',
                          })
                      }
                  }

                  if (type === 'photo' && category === 'carousels-2') {
                      const photoCount = await Link.countDocuments({
                          type: 'photo',
                          category: 'carousels-2',
                      })
                      
                      if (photoCount >= 1000) {
                          return res.status(403).json({
                              message: 'Limit reached: Only 20 photos allowed in carousels-2',
                          })
                      }
                  }
                  
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