'use server';

import { Student } from "@/db/models/studentModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    try {
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 300; // Number of students per page
        const skip = (page - 1) * limit;

        const course = req.nextUrl.searchParams.get("course");
        const branch = req.nextUrl.searchParams.get("branch");
        const department = req.nextUrl.searchParams.get("department");
        const search = req.nextUrl.searchParams.get("search") || '';

        const reqUser = JSON.parse(req.headers.get("user"))

        const query = {};
        if (reqUser.role === 'teacher') {
            query.addedBy = reqUser._id;
        }

        // Build query based on search params and also case insensitive
        if (department && department !== 'all') query.department = { $regex: new RegExp(department.replace('+', ' '), 'i') };

        if (course && course !== 'all') query.course = { $regex: new RegExp(course, 'i') };

        if (branch && branch !== 'all') query.branch = { $regex: new RegExp(branch, 'i') }

        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case insensitive search
            query.$or = [
                { name: searchRegex },
                { roll_number: searchRegex },
            ]
        }

        // Fetch all students with pagination
        const students = await Student.find(query)
            .sort({  name: 1, department: 1, course: 1, branch: 1, }) // Sort by name in ascending order
            .skip(skip)
            .limit(limit)

        // Count total students for pagination metadata
        const totalStudents = await Student.countDocuments(query);

        return NextResponse.json({
            message: "Students fetched successfully",
            data: students || [],
            pagination: {
                totalStudents,
                currentPage: page,
                totalPages: Math.ceil(totalStudents / limit),
            },
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while fetching students",
        }, { status: 500 });
    }
});
