import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required to generate a token");
        }

        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_AFTER }
        );

        return token;

    } catch (error) {
        console.log("Error in generating token:", error.message);
        return null;
    }
};

export default generateToken;
// jsonwebtoken by default JWT ko HS256 se sign karta hai, jab tum algorithm specify nahi karte.
// Phir explicitly likhne ka faida kya hai?
// - Code dekh kar clear hota hai ke kaunsa algorithm use ho raha hai.
// - Security configuration explicit rehti hai.
// - Verification ke waqt allowed algorithm restrict karne mein consistency rehti hai.