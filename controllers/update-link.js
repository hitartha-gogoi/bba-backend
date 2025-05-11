import Link from "../models/link.js"

export default async function UpdateLink(req,res){

    try {

        const link = await Link.findById(req.params.id)
        if (!link) {
            return res.status(403).json({ message: 'No Link found' });
        }

        await Link.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json({ link: link, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}