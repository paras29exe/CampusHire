'use server';
import { NextResponse } from "next/server";
import { Student } from "@/db/models/studentModel";
import { withDB } from "@/utils/server/dbHandler";
import formatSheet from "@/utils/server/formatSheet";
import { filterOnlyUniqueStudents } from "@/utils/server/filterOnlyUniqueStudents";
import { sendCredentialsToTeacher } from "@/utils/server/sendCredentialsToTeacher";
import { Teacher } from "@/db/models/teacherModel";

export const POST = withDB(async (req) => {
    try {
        const formData = await req.formData();
        const reqUser = JSON.parse(req.headers.get("user"));

        const file = formData.get("file");
        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        // Check if the file is an Excel file
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            return NextResponse.json({ error: "Invalid file type. Please upload an Excel file." }, { status: 400 });
        }
        // less than 50 mb file
        if (file.size > 50 * 1024 * 1024) {
            return NextResponse.json({ error: "File size exceeds the limit of 16 MB." }, { status: 400 });
        }

        const requiredFields = ["name", "rollno", "email", "college_email", "phone", "course", "branch", "batch", "backlogs", "tenth_percentage", "twelfth_percentage", "graduation_percentage"];

        const formattedData = await formatSheet(file, requiredFields);

        // save data to database
        if (!formattedData || formattedData.length === 0) {
            return NextResponse.json({ error: "No valid data found in the file." }, { status: 400 });
        }
        // Assuming formattedData is an array of student objects
        if (formattedData.length > 500) {
            return NextResponse.json({ error: "Too many students. Please upload a file with less than 500 students." }, { status: 400 });
        }

        const newStudents = await filterOnlyUniqueStudents(formattedData);

        const teacher = await Teacher.findById(reqUser._id, "email");

        // Send credentials to teacher
        const emailSent = await sendCredentialsToTeacher(teacher.email, newStudents);

        if (!emailSent) {
            return NextResponse.json({ error: "Failed to send email with student credentials." }, { status: 500 });
        }

        // Insert only fully unique students
        const insertedStudents = await Student.insertMany(newStudents);

        return NextResponse.json({
            message: "Successfully inserted new students.",
            data: insertedStudents,
            insertedCount: newStudents.length,
            skippedCount: formattedData.length - newStudents.length
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({
            message: err.message || "An unexpected error occurred while adding students.",
            error: "An error occurred while processing the request.",
            data: err.data
        }, { status: err.status || 500 });
    }
});