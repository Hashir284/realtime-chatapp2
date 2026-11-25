import express from "express"
import { editProfile, getCurrentUser, getOtherUsers } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"
import { uploadMulterMiddleWare } from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentUser)
userRouter.put("/profile", isAuth, uploadMulterMiddleWare.single("image"), editProfile)
userRouter.get("/others", isAuth, getOtherUsers)

export default userRouter