import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_name}`)
        console.log(`DB connected || DB_host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("DB connection failed" , error)
        process.exit(1)
    }
}

export default connectDB