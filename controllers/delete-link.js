import Link from "../models/link.js"

export default async function DeleteLink(req,res){

    try {

        const link = await Link.findById(req.params.id)
        if (!link) {
            return res.status(403).json({ message: 'No Link found' });
        }

        await Link.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Link deleted successfully" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}