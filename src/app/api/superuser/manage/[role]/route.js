'use server';

import { Admin } from "@/db/models/adminModel";
import { SuperUser } from "@/db/models/superUserModel";
import { Teacher } from "@/db/models/teacherModel";
import { withDB } from "@/utils/server/dbHandler";
import { generatePassword } from "@/utils/server/generatePassword";
import { NextResponse } from "next/server";

export const POST = withDB(async (req, { params }) => {
    try {
        const param = await params;
        const role = param.role?.toLowerCase().split('-')[1];

        if (!role || !['admin', 'teacher', 'superuser'].includes(role.toLowerCase())) {
            return NextResponse.json({
                message: "Invalid role specified",
            }, { status: 400 });
        }

        const { employee_id, name, email, phone, department } = await req.json();

        if (!employee_id || !name || !email || !phone) {
            return NextResponse.json({
                message: "All fields are required",
            }, { status: 400 });
        }

        if (role === "teacher" && !department) {
            return NextResponse.json({
                message: "Department is required for teachers",
            }, { status: 400 });
        }

        // validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                message: "Invalid email format",
            }, { status: 400 });
        }

        // validate phone number format (10 digits)
        if (!/^\d{10}$/.test(phone.replace("-", ""))) {
            return NextResponse.json({
                message: "Phone number must be 10 digits",
            }, { status: 400 });
        }

        const modelMap = {
            admin: Admin,
            teacher: Teacher, // Assuming Teacher model is imported
            superuser: SuperUser, // Assuming SuperUser model is imported
        };

        const Model = modelMap[role];

        // Check if admin already exists
        const existingUser = await Model.findOne({ $or: [{ email }, { phone }, { employee_id }] });

        if (existingUser) {
            return NextResponse.json({
                message: "Admin with the provided email, phone, or employee ID already exists",
            }, { status: 409 });
        }

        const randomPassword = generatePassword()

        // Create new admin
        const newAuthority = await Model.create({
            employee_id,
            name,
            email,
            password: randomPassword,
            phone: phone.replace("-", ""),
            department, // whichever role has department in schema it get added
        });

        return NextResponse.json({
            message: `New ${role.toUpperCase()} added successfully`,
            password: randomPassword,
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while adding the admin",
        }, { status: 500 });
    }
});