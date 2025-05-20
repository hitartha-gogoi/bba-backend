import Lawyer from "../models/lawyer.js"

export default async function GetEnrolmentId(req,res){

    try {
        
        const lawyer = await Lawyer.findOne({ enrolmentNumber: req.query.enrolmentId })
        if (!lawyer) {
            return res.status(403).json({ message: 'No lawyers found' });
        }

        return res.status(200).json({ enrolmentId: lawyer.enrolmentNumber, lawyer, message: "success" });

    } catch(error){

        console.error(req.params.id)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}