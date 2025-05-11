import Link from "../models/link.js"

export default async function GetLinks(req,res){

    try {

        const links = await Link.find()
        if (!links || links.length === 0) {
            return res.status(403).json({ message: 'No Link found' });
        }

        res.status(200).json({ links: links, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}