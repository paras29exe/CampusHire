import mongoose from "mongoose";

const dbName = process.env.DB_NAME;
let isConnected = false;

const connectDB = async () => {
    mongoose.disconnect(); // Ensure we start with a clean state
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI + dbName);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't exit the process, just log the error
  }
};

export default connectDB;