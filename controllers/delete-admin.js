import User from "../models/user.js"

export default async function DeleteAdmin(req,res){

    try {

        const admin = await User.findById(req.params.id)

         if (req.user.type !== "owner") {
             return res.status(403).json({ message: "Unauthorized" });
        }

        const userToDelete = await User.findById(req.params.id);
        // 3. Prevent owner from deleting another owner or an admin
        
        if (userToDelete.type === "owner" || userToDelete.type === "admin") {
            return res.status(403).json({ message: "Cannot delete another admin or owner" });
        }

        if (!admin) {
            return res.status(404).json({ message: 'No admin found' });
        }

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "admin deleted successfully" });

    } catch(error){
        console.error(error)
        res.status(500).json({ message: 'Internal server error', error });
    }  
}