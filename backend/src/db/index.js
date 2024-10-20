import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'; 

export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MogoDB connection failed");
        process.exit(1);
    }
}

// TODO: Change the database uri afterwards