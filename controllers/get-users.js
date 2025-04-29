import User from "../models/user.js"

export default async function getUsers(req,res){

    try {
        
        const users = await User.find()
        if (!users || users.length === 0) {
            return res.status(403).json({ message: 'No users found' });
        }

        res.status(200).json({ users: users, message: "success" });

    } catch(error){

        console.error(req.params.id)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}