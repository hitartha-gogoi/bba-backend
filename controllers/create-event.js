import Event from '../models/event.js'
import 'dotenv/config'


export default async function CreateEvent(req,res) {
    
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

          const { title, location, description, startDate, endDate } = req.body

          const fileUrl = req.file.path

          const existingEvent = await Event.findOne({ title: title });
          if (existingEvent) {
            console.log("event already exists!")

              return res.status(400).json({ message: 'Event already exists' });
          }

          const newEvent = new Event({
              title: title,
              photo: fileUrl,
              location: location,
              description: description,
              timestamp: new Date().toISOString(),
              status: true,
              startDate: startDate,
              endDate: endDate
          })

          await newEvent.save()
          res.status(200).json({ message: "success", event: newEvent });

      } catch(error){
          res.status(500).json({ message: 'error', error });
          console.log(error)
      }
    
}