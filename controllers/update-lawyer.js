import Lawyer from "../models/lawyer.js"

export default async function UpdateLawyer(req,res){

    try {

        const lawyer = await Lawyer.findById(req.params.id)
        if (!lawyer) {
            return res.status(403).json({ message: 'No Lawyer found' });
        }

        await Lawyer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json({ lawyer: lawyer, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}