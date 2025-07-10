'use server';

import { Admin } from "@/db/models/adminModel";
import { Student } from "@/db/models/studentModel";
import { SuperUser } from "@/db/models/superUserModel";
import { Teacher } from "@/db/models/teacherModel";
import { options } from "@/utils/server/cookieOptions";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const POST = withDB(async (req, { params }) => {
    try {
        const role = params.role?.toLowerCase();
        console.log("Role:", role);

        if (!role || !['student', 'superuser', 'admin', 'teacher'].includes(role)) {
            return NextResponse.json({
                message: "Invalid role specified",
            }, {
                status: 400,
            });
        }

        const { identifier, password } = await req.json();

        if (!identifier || !password) {
            return NextResponse.json({
                message: "Credentials are required",
            }, {
                status: 400,
            });
        }

        const modelMap = {
            student: Student,
            superuser: SuperUser,
            admin: Admin,
            teacher: Teacher,
        }

        const Model = modelMap[role];

        const user = await Model.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        }).select("+password");

        if (!user) {
            return NextResponse.json({
                message: `No ${role.toUpperCase()} found with the provided username or email`,
            }, {
                status: 404,
            })
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return NextResponse.json({
                message: "Invalid password",
            }, {
                status: 401,
            });
        }
        const token = await user.generateAuthToken();
        // Exclude password from the response
        user.password = undefined;

        const res = NextResponse.json({
            message: "Superuser verified successfully",
            data: user, // Exclude password from response
        }, { status: 200 });

        res.cookies.set('accessToken', token, options);

        return res;
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Internal Server Error",
            error: "An unexpected error occurred",
        }, {
            status: 500,
        });
    }
})