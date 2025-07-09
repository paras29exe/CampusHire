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

        const query = {};
        if (department) query.department = department;
        if (course) query.course = course;
        if (branch) query.branch = branch;

        // Fetch all students with pagination
        const students = await Student.find(query)
            .sort({ department: 1, course: 1, name: 1 }) // Sort by name in ascending order
            .skip(skip)
            .limit(limit)
            .populate('department', 'name') // Populate department name
            .populate('course', 'name'); // Populate course name

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
});

export const dynamic = 'force-dynamic'; // Ensure this route is always fresh
export const revalidate = 0; // Disable caching for this route