import Event from "../models/event.js"

export default async function GetEvents(req,res){

    try {
        
        const events = await Event.find().sort({ startDate: 1 })
        if (!events || events.length === 0) {
            return res.status(403).json({ message: 'No Events found' });
        }

        res.status(200).json({ events: events, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}