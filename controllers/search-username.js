import Lawyer from "../models/lawyer.js"
import 'dotenv/config'

export default async function SearchUsername(req,res){
    try{
        console.log(`SEARCHING USERNAME OR ENROLLMENT NUMBER IN DIRECTORY. QUERY: ${req.query.username} `)
        const lawyers = await Lawyer.find({ $or: [ 
            { username: { $regex: req.query.username, $options: 'i' } },
            { enrolmentNumber: { $regex: req.query.username, $options: 'i' } }
        ]
    })
        res.status(200).json({ message: "message", lawyers: lawyers })
    } catch(error){
        console.error("Internal Server Error: ", error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}