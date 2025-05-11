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