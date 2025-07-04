'use server';

import { Teacher } from "@/db/models/teacherModel";
import { options } from "@/utils/server/cookieOptions";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const POST = withDB(async (req) => {
    try {
        const form = await req.formData();
        const body = form && Object.fromEntries(form.entries());

        const { identifier, password } = body;

        if (!identifier || !password) {
            return NextResponse.json({
                message: "Credentials are required",
            }, {
                status: 400,
            });
        }

        const user = await Teacher.findOne({
            $or: [{ employee_id: identifier }, { email: identifier }],
        }).select("+password");

        if (!user) {
            return NextResponse.json({
                message: "Teacher not found with the provided ID or email",
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
            message: "Teacher verified successfully",
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