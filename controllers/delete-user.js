import User from "../models/user.js"

export default async function DeleteUser(req,res){

    try {

        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(403).json({ message: 'No User found' });
        }

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User deleted successfully" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}