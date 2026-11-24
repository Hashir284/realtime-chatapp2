import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const uploadCloudinary = async (filePath) => {
    try {
        await cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret
        })
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto'
        }) 
        return uploadResult.secure_url
    } catch (error) { 
        console.log(error);
    } finally{
        fs.unlinkSync(filePath)
    }
}

export default uploadCloudinary