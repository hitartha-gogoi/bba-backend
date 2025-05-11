import User from "../models/user.js"
import 'dotenv/config'

export default async function SearchUsername(req,res){
    try{
        console.log(`SEARCHING USERNAME OR EMAIL IN DIRECTORY. QUERY: ${req.query.username} `)
        const users = await User.find({ username: { $regex: req.query.username, $options: 'i' } })
        res.status(200).json({ message: "message", lawyers: users })
    } catch(error){
        console.error("Internal Server Error: ", error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}