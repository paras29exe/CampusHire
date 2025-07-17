import connectDB from "@/db";
import { NextResponse } from "next/server";

export const withDB = (handler) => {
  return async (req, ...args) => {
    try {
      await connectDB();
      return handler(req, ...args);
    } catch (error) {
      console.error("Database connection error:", error);
      return NextResponse.json({ message: error.message || "Database connection failed" }, { status: 500 });
    }
  };
}