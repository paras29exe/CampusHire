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
        const file = formData.get("file");
        const reqUser = JSON.parse(req.headers.get("user") || "{}");

        if (!courseAndBranch) {
            return NextResponse.json({ message: "Course Selection is required" }, { status: 400 });
        }
        
        if (!file) {
            return NextResponse.json({ message: "File is required" }, { status: 400 });
        }

        // Check if the file is an Excel file
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            return NextResponse.json({ message: "Invalid file type. Please upload an Excel file." }, { status: 400 });
        }
        // less than 50 mb file
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ message: "File size exceeds the limit of 10 MB." }, { status: 400 });
        }

        const requiredFields = ["name", "roll_number", "email", "college_email", "phone", "batch", "backlogs", "department", "tenth_percentage", "twelfth_percentage"];

        const formattedData = await formatSheet(file, requiredFields);

        if (!formattedData || formattedData.length === 0) {
            return NextResponse.json({ message: "No valid data found in the file." }, { status: 400 });
        }

        // Assuming formattedData is an array of student objects
        if (formattedData.length > 500) {
            return NextResponse.json({ message: "Too many students. Please upload a file with less than 500 students." }, { status: 400 });
        }

        // filtering those who dont exist in the database
        const filteredStudents = await filterOnlyUniqueStudents(formattedData);

        if (filteredStudents.length === 0) {
            return NextResponse.json({ message: "All these students already exist in database" }, {
                status: 400
            });
        }
        
        // save the course and branch from the form data
        const [course, branch] = courseAndBranch.split('-')

        const newStudents = filteredStudents.map(student => {
            student.course = course.toUpperCase(), // Set the course and branch from the form data
            student.added_by = reqUser._id;// Set the added_by field to the teacher's ID
            if (branch) {
                student.branch = branch.toUpperCase(); // Set the branch if provided
            }
            return student;
        })
        
        const teacher = await Teacher.findById(reqUser._id, "email");
        // Send credentials to teacher
        
        // Insert only fully unique students
        const insertedStudents = await Student.create(newStudents);
        
        const emailSent = await sendCredentialsToTeacher(teacher.email, newStudents);

        if (!emailSent) {
            // remove the inserted students if email sending fails
            await Student.deleteMany({ _id: { $in: insertedStudents.map(s => s._id) } });
            return NextResponse.json({
                message: "Failed to send email with credentials. Students were not added.",
                data: newStudents
            }, { status: 500 });
        }

        return NextResponse.json({
            message: "Successfully inserted new students.",
            data: insertedStudents,
            insertedCount: newStudents.length,
            skippedCount: formattedData.length - newStudents.length
        }, { status: 200 });

    } catch (err) {
        console.error("Error adding students from file:", err);
        return NextResponse.json({
            message: err.message || "An unexpected error occurred while adding students.",
            error: "An error occurred while processing the request.",
            data: err.data
        }, { status: err.status || 500 });
    }
});