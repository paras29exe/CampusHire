'use server';

import { NextResponse } from "next/server";
import { Admin } from "@/db/models/adminModel";
import { Teacher } from "@/db/models/teacherModel";
import { withDB } from "@/utils/server/dbHandler";

export const DELETE = withDB(async (req, {params}) => {
    const { role } = await params;
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({
            error: "User ID is required",
            message: "Please provide a valid user ID to delete."
        }, { status: 400 });
    }

    try {
        if(!['admin', 'teacher'].includes(role)) {
            return NextResponse.json({
                error: "Invalid role",
                message: "Either 'admin' or 'teacher' can be deleted."
            }, { status: 400 });
        }

        const Model = role === 'admin' ? Admin : Teacher;

        await Model.findByIdAndDelete(userId);
       
        return NextResponse.json({
            message: "User deleted successfully",
            data: {}
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "An error occurred while deleting the user",
            message: "Failed to delete the user."
        }, { status: 500 });
    }
});