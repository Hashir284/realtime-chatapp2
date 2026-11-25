import uploadCloudinary from "../configuration/cloudinary.js";
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        let userId = req.userId

        let user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in getCurrent User Internal Server Error " + error })
    }
}

export const editProfile = async (req, res) => {
    try {
        let { name } = req.body
        // console.log(req.file);
        // console.log(req.body);

        let image
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }

        let user = await User.findByIdAndUpdate(req.userId, {
            name,
            image
        })

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in editProfile User Internal Server Error " + error })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        let users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password")
        return res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Error in getOtherUsers User Internal Server Error " + error })
    }
}