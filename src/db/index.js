'use server';
import mongoose from "mongoose";
import '@/db/models/adminModel'
import '@/db/models/applicationsModel'
import '@/db/models/assignmentsModel'
import '@/db/models/jobModel'
import '@/db/models/studentModel'
import '@/db/models/superUserModel'
import '@/db/models/teacherModel'

const connectDB = async () => {
  const dbName = process.env.DB_NAME;
  if (mongoose.connection.readyState > 0) return;

  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error
  }
};

export default connectDB;