import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (!token || typeof token !== "string") {
            return res.status(401).json({ message: "Unauthorized: token not found" });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken?.userId) {
            return res.status(401).json({ message: "Unauthorized: invalid token payload" });
        }

        req.userId = verifyToken.userId
        return next()

    } catch (error) {
        res.status(500).send({ message: "isauth error " + error })
    }
}

export default isAuth 