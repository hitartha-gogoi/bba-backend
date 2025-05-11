import Event from "../models/event.js"

export default async function UpdateEvent(req,res){

    try {

        const event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(403).json({ message: 'No Event found' });
        }

        await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json({ event: event, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}