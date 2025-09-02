import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`BACKEND CONNECTED SUCCESSFULLY TO MONGODB DATABASE✌️`);
        
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        process.exit(1)
    }
}