import connectDB from "@/db";
import { NextResponse } from "next/server";

export const withDB = (handler) => {
  return async (req, ...args) => {
    try {
      await connectDB();
      return handler(req, ...args);
    } catch (error) {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  };
}