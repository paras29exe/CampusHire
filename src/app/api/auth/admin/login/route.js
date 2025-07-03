'use server';
import { Admin } from "@/db/models/adminModel";
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

        const user = await Admin.findOne({
            $or: [{ employee_id: identifier }, { email: identifier }],
        }).select("+password");

        if (!user) {
            return NextResponse.json({
                message: "Admin not found with the provided identifier",
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

        return NextResponse.json({
            message: "Admin verified successfully",
            data: user
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Error verifying admin",
            error: error.message,
        }, {
            status: 500,
        });
    }
})