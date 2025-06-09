import Lawyer from "../models/lawyer.js"

export default async function UpdateLawyerPhoto(req,res){

    try {

        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const lawyer = await Lawyer.findById(req.params.id)
        if (!lawyer) {
            return res.status(403).json({ message: 'No Lawyer found' });
        }

        await Lawyer.findByIdAndUpdate(req.params.id, { $set: { photo: req.file.path } }, { new: true })

        res.status(200).json({ lawyer: lawyer, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}