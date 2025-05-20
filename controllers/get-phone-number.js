import Lawyer from "../models/lawyer.js"

export default async function GetPhoneNumber(req,res){

    try {
        
        const lawyer = await Lawyer.findOne({ phone: req.query.phone })
        if (!lawyer || lawyer.length === 0) {
            return res.status(403).json({ message: 'No lawyers found' });
        }

        res.status(200).json({ lawyer: lawyer, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}