'use server';

import { Student } from "@/db/models/studentModel";
import { withDB } from "@/utils/server/dbHandler";
import { generatePassword } from "@/utils/server/generatePassword";
import { NextResponse } from "next/server";

export const POST = withDB(async (req) => {
    try {
        const { roll_number, name, email, college_email, phone, course, branch, department, batch, backlogs, tenth_percentage, twelfth_percentage } = await req.json();
    
        if (!roll_number || !name || !email || !college_email || !phone || !course || !branch || !department || !batch || !tenth_percentage || !twelfth_percentage) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
    
        // Validate roll_number format only numbers 
        if (!/^\d+$/.test(roll_number)) {
            return NextResponse.json({ message: "Roll number must contain only numbers" }, { status: 400 });
        }
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {  
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }
    
        // Validate college email format
        if (!emailRegex.test(college_email)) {
            return NextResponse.json({ message: "Invalid college email format" }, { status: 400 });
        }
        // Validate phone number format (10 digits)
        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ message: "Phone number must be 10 digits" }, { status: 400 });
        }
    
        // Validate percentage format (0-100)
        const percentageRegex = /^(100|[1-9]?\d)(\.\d+)?$/;
        if (!percentageRegex.test(tenth_percentage) || !percentageRegex.test(twelfth_percentage)) {
            return NextResponse.json({ message: "Percentage must be a valid number between 0 and 100" }, { status: 400 });
        }
    
        // Check if student already exists
        const existingStudent = await Student.findOne({ roll_number });
        if (existingStudent) {
            return NextResponse.json({ message: "Student with this roll number already exists" }, { status: 400 });
        }
        const randomPassword = generatePassword();
        // Create new student
        const newStudent = new Student({
            roll_number,
            name,
            email,
            password: randomPassword,
            college_email,
            phone,
            course,
            branch,
            department,
            batch,
            backlogs: backlogs ? parseInt(backlogs) : 0, // Default to 0 if not provided
            tenth_percentage: parseFloat(tenth_percentage),
            twelfth_percentage: parseFloat(twelfth_percentage),
        });
        await newStudent.save();

        return NextResponse.json({
            message: "Student added successfully",
            password: randomPassword,
        }, { status: 201 });

    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while adding the student"
        }, { status: err.status || 500 });
    }
}
);

