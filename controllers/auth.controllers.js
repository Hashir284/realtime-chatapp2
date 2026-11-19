import generateToken from "../configuration/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const checkUserbyUserName = await User.findOne({ userName })
        if (checkUserbyUserName) {
            return res.status(400).json({ message: "username already exists" })
        }

        const checkUserbyEmail = await User.findOne({ email })
        if (checkUserbyEmail) {
            return res.status(400).json({ message: "email already exists" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 charactors" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({ userName, hashedPassword, email })
        user = user.toJSON()
        delete user.hashedPassword;

        const token = generateToken(user._id)

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `signup error ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user does not exist" })
        }

        const isMatched = await bcrypt.compare(password, user.hashedPassword)
        if (!isMatched) {
            return res.status(400).json({ message: "incorrect password" })
        }

        const token = generateToken(user._id)

        res.cookie('token', token, {
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: `login error ${error}` })
    }
}

export const logOut = (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: 'logout successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'logout error ' + error })
    }
}