import Lawyer from "../models/lawyer.js"

export default async function GetLawyers(req,res){

    try {
        
        const lawyers = await Lawyer.find()
        if (!lawyers || lawyers.length === 0) {
            return res.status(403).json({ message: 'No lawyers found' });
        }

        res.status(200).json({ lawyers: lawyers, message: "success" });

    } catch(error){

        console.error(req.params.id)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}