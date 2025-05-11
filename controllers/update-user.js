import User from "../models/user.js"

export default async function UpdateUser(req,res){

    try {

        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(403).json({ message: 'No User found' });
        }

        await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json({ user: user, message: "success" });

    } catch(error){

        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}