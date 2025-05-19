import User from "../models/user.js"

export default async function GetAdmins(req,res){

    try {
        
        const admins = await User.find()
        if (!admins || admins.length === 0) {
            return res.status(403).json({ message: 'No Admins found' });
        }

        res.status(200).json({ admins: admins, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}