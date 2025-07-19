'use server';

import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import { Student } from "@/db/models/studentModel";
import { Teacher } from "@/db/models/teacherModel";
import { SuperUser } from "@/db/models/superUserModel";
import { Admin } from "@/db/models/adminModel";

export const PUT = withDB(async (req, { params }) => {
    try {
        const { role } = await params;
        const reqUser = JSON.parse(req.headers.get("user") || "{}");

        if (!["student", "teacher", "superuser", "admin"].includes(role)) {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }

        const { oldPassword, newPassword } = await req.json();
        
        if (!oldPassword || !newPassword) {
            return NextResponse.json({ message: "Old and new passwords are required" }, { status: 400 });
        }

        const modalMap = {
            student: Student,
            teacher: Teacher,
            superuser: SuperUser,
            admin: Admin
        }

        const Model = modalMap[role];

        const user = await Model.findById(reqUser._id).select("+password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const isMatch = await user.comparePassword(oldPassword, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 });
        }
        if (newPassword.length < 6) {
            return NextResponse.json({ message: "New password must be at least 6 characters long" }, { status: 400 });
        }

        if (oldPassword === newPassword) {
            return NextResponse.json({ message: "New password must be different from old password" }, { status: 400 });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message, error: "Internal server message" }, { status: 500 });
    }
});