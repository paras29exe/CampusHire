'use server';

import { Admin } from "@/db/models/adminModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const POST = withDB(async (req) => {
    try {
        const formData = await req.formData();
        const body = formData && Object.fromEntries(formData.entries());

        // Validate required fields
        const { employee_id, name, email, phone } = body;
        if (!employee_id || !name || !email || !phone) {
            return NextResponse.json({
                error: "All fields are required",
            }, { status: 400 });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }, { employee_id }] });
        if (existingAdmin) {
            return NextResponse.json({
                error: "Admin with the provided email, phone, or employee ID already exists",
            }, { status: 409 });
        }

        // Create new admin
        const newAdmin = new Admin({
            employee_id,
            name,
            email,
            password,
            phone,
        });
        await newAdmin.save();

        return NextResponse.json({
            message: "Admin added successfully",
            data: newAdmin,
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "Unexpected error occurred",
            message: "An error occurred while adding the admin",
        }, { status: 500 });
    }
});