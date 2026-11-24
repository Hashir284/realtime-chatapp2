import multer from "multer"

const storage = multer.diskStorage({
    // destination: "./upload/", OR 
    destination: (req, file, callback) => {
        callback(null, "./src/public")
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploadMulterMiddleWare = multer({ storage })