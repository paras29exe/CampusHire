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
        // array of courses with branches .... B.tech-CSE, B.Tech-IT, M.Tech-CSE, MCA
        const formData = await req.formData();
        const courseAndBranch = formData.get("course_and_branch");

        if (!courseAndBranch) {
            return NextResponse.json({ error: "Course Selection is required" }, { status: 400 });
        }

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

        const requiredFields = ["name", "rollno", "email", "college_email", "phone", "batch", "backlogs", "tenth_percentage", "twelfth_percentage", "graduation_percentage"];

        const formattedData = await formatSheet(file, requiredFields);

        if (!formattedData || formattedData.length === 0) {
            return NextResponse.json({ error: "No valid data found in the file." }, { status: 400 });
        }

        // Assuming formattedData is an array of student objects
        if (formattedData.length > 500) {
            return NextResponse.json({ error: "Too many students. Please upload a file with less than 500 students." }, { status: 400 });
        }

        const filteredStudents = await filterOnlyUniqueStudents(formattedData);

        if (filteredStudents.length === 0) {
            return NextResponse.json({ error: "No unique or new students found in the file." }, {
                status: 400
            });
        }

        // save the course and branch from the form data
        let course = null;
        let branch = null;

        if (courseAndBranch.includes("-")) {
            [course, branch] = courseAndBranch.split("-"); //B.Tech-CSE
        } else {
            course = courseAndBranch;
            branch = null; // If no branch is specified, set it to null
        }

        const newStudents = filteredStudents.forEach(student => {
            student.course = course.toUpperCase(); // Set the course and branch from the form data
            if (branch) {
                student.branch = branch.toUpperCase(); // Set the branch if provided
            }
        })

        const teacher = await Teacher.findById(reqUser._id, "email");

        // Send credentials to teacher
        const emailSent = await sendCredentialsToTeacher(teacher.email, newStudents);

        if (!emailSent) {
            return NextResponse.json({ error: "Failed to send email with student credentials." }, { status: 500 });
        }

        // Insert only fully unique students
        const insertedStudents = await Student.create(newStudents);

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