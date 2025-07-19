'use server';

import { Student } from "@/db/models/studentModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";

export const DELETE = withDB(async (req) => {
    try {
        const studentId = req.nextUrl.searchParams.get("id");

        if (!studentId) {
            return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return NextResponse.json({ mesage: "Student not found" }, { status: 404 });
        }

        await Student.deleteOne({ _id: studentId });

        return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json({ mesage: error.mesage || "Internal server error" }, { status: 500 });
    }
});