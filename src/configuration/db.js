import mongoose from "mongoose"
import "dotenv/config";

const connectDb = async () =>{
    let MONGODB_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb