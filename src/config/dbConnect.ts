import mongoose from "mongoose";

export const dbConnect = async (): Promise<void> => {
    const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://arifpatanduk2:arifpatanduk2@cluster0.oob4go0.mongodb.net/?retryWrites=true&w=majority"
    try {
        await mongoose.connect(MONGO_URL)
        console.log('db is connected successfully');
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
}
