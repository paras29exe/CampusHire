'use server';

import { Teacher } from "@/db/models/teacherModel";
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

        const currTeacher = JSON.parse(req.headers.get("user"));

        const teacher = await Teacher.findById(currTeacher._id, 'department')

        const query = {
            department: { $in: teacher.department }
        };
        
        if (course) query.course = course;
        if (branch) query.branch = branch;
        
        // Fetch all students with pagination
        const students = await Student.find(query)
            .sort(course ? {name: 1} : {department: 1}) // Sort by creation or name 
            .skip(skip)
            .limit(limit)

        // Count total students for pagination metadata
        const totalStudents = await Student.countDocuments(query);

        return NextResponse.json({
            message: "Students fetched successfully",
            data: students,
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
})
