import Transaction from "../models/transaction.js"

export default async function GetVakalatnamas(req,res){

    try {
        
        const vakalatnamas = await Transaction.find({ phoneNumber: req.query.phoneNumber, type: "vakalatnama" }).sort({ timestamp: -1 })
        if (!vakalatnamas || vakalatnamas.length === 0) {
            return res.status(403).json({ message: 'No Vakalatnamas found' });
        }

        const latestTransaction = await Transaction.findOne({ phoneNumber: req.query.phoneNumber }).sort({ timestamp: -1 })
 
        return res.status(200).json({ vakalatnamas: vakalatnamas, latestTransaction, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}