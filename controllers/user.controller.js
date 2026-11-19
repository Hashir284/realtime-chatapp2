import User from "../models/user.model.js"

export const getCurrentUser = async (req, res)=>{
    try {
        let userId = req.userId
        let user = await User.findById({userId}).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return user
    } catch (error) {
        
    }
}