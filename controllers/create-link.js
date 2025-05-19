import Link from '../models/link.js'
import 'dotenv/config'


export default async function CreateLink(req,res) {
    
    try {

          const { title, description, link, category, type } = req.body

          const existingLink = await Link.findOne({ link: link });
          if (existingLink) {
            console.log("Link already exists!")

              return res.status(400).json({ message: 'Link already exists' });
          }

          // ✅ Enforce max limit of 20 for photo + carousels-1
          if (type === 'photo' && category === 'carousels-1') {
            const photoCount = await Link.countDocuments({
                type: 'photo',
                category: 'carousels-1',
            })
            
            if (photoCount >= 20) {
                return res.status(403).json({
                    message: 'Limit reached: Only 20 photos allowed in carousels-1',
                })
            }
        }


          const newLink = new Link({
              title: title,
              description: description,
              link: link,
              type: type,
              category: category,
              timestamp: new Date().toISOString(),
          })

          await newLink.save()
          res.status(200).json({ message: "success", link: newLink });

      } catch(error){
          res.status(500).json({ message: 'error', error });
          console.log(error)
      }
    
}