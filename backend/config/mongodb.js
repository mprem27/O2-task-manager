import mongoose from "mongoose";

const connectMongoDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected", `${mongoose.connection.host}`);
};

export default connectMongoDB;
