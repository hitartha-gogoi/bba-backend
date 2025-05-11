import Event from "../models/event.js"
import 'dotenv/config'

export default async function SearchEvents(req,res){
    try{
        console.log(`SEARCHING EVENT IN DIRECTORY. QUERY: ${req.query.title} `)
        const events = await Event.find({ title: { $regex: req.query.title, $options: 'i' } })
        return res.status(200).json({ message: "message", events: events })
    } catch(error){
        console.error("Internal Server Error: ", error)
        return res.status(500).json({ message: "Internal Server Error"})
    }
}