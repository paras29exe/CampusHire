'use server';

import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import { options } from "@/utils/server/cookieOptions";
import { SuperUser } from "@/db/models/superUserModel";
import { Admin } from "@/db/models/adminModel";
import { Teacher } from "@/db/models/teacherModel";
import { Student } from "@/db/models/studentModel";

export const GET = withDB(async (req) => {
    try {
        // this is always valid and passed from middleware.js
        const user = JSON.parse(req.headers.get("user"));        

        const getModel = (role) => {
            switch (role) {
                case 'superuser':
                    return SuperUser;
                case 'admin':
                    return Admin;
                case 'teacher':
                    return Teacher;
                case 'student':
                    return Student;
                default:
                    throw new Error("Invalid user role");
            }
        }

        const modal = getModel(user.role);

        const userData = await modal.findById(user._id).select("+password");

        if (!userData) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const updatedToken = await userData.generateAuthToken();

        const res = NextResponse.json({
            message: "User data retrieved successfully",
            data: userData,
        }, { status: 200 });

        res.cookies.set('accessToken', updatedToken, options);

        return res;
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Internal Server Error",
            error: "An unexpected error occurred",
        }, { status: 500 });
    }
});
