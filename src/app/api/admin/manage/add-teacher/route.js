'use server';

import { Teacher } from "@/db/models/teacherModel";
import { withDB } from "@/utils/server/dbHandler";
import { generatePassword } from "@/utils/server/generatePassword";
import { NextResponse } from "next/server";

export const POST = withDB(async (req) => {
    try {
        // Validate required fields
        const { employee_id, name, email, phone, department } = await req.json();

        if (!employee_id || !name || !email || !phone || department) {
            return NextResponse.json({
                error: "All fields are required",
            }, { status: 400 });
        }

        // // Validate phone number format (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({
                error: "Phone number must be 10 digits",
            }, { status: 400 });
        }

        // Check if teacher already exists
       
        const existingTeacher = await Teacher.findOne({ $or: [{ email }, { phone }, { employee_id }] });
        if (existingTeacher) {
            return NextResponse.json({
                error: "Teacher with the provided email, phone, or employee ID already exists",
            }, { status: 409 });
        }

        const randomPassword = generatePassword();
        // Create new teacher
        const newTeacher = new Teacher({
            employee_id,
            name,
            email,
            password: randomPassword,
            phone,
            department,
        });
        await newTeacher.save();

        return NextResponse.json({
            message: "Teacher added successfully",
            password: randomPassword,
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while adding the teacher",
        }, { status: 500 });
    }
});