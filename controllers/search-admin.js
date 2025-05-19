import User from "../models/user.js"
import 'dotenv/config'

export default async function SearchAdmin(req,res){
    try{
        console.log(`SEARCHING USERNAME OR EMAIL IN DIRECTORY. QUERY: ${req.query.username} `)
        const admins = await User.find({ username: { $regex: req.query.username, $options: 'i' } })
        res.status(200).json({ message: "message", admins: admins })
    } catch(error){
        console.error("Internal Server Error: ", error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}