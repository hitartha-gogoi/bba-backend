import Lawyer from "../models/lawyer.js"

export default async function DeleteLawyer(req,res){

    try {

        const lawyer = await Lawyer.findById(req.params.id)
        if (!lawyer) {
            return res.status(403).json({ message: 'No Lawyer found' });
        }

        await Lawyer.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Lawyer deleted successfully" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}