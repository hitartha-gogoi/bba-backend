import Event from "../models/event.js"

export default async function UpdateEventPhoto(req,res){

    try {

        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(403).json({ message: 'No Event found' });
        }

        await Event.findByIdAndUpdate(req.params.id, { $set: { photo: req.file.path } },  { new: true })

        res.status(200).json({ event: event, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}