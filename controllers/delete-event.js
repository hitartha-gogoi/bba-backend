import Event from "../models/event.js"

export default async function DeleteEvent(req,res){

    try {

        const event = await Event.findById(req.params.id)
        if (!event) {
            return res.status(403).json({ message: 'No Event found' });
        }

        await Event.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Event deleted successfully" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}