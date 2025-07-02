'use server-only';
import { NextResponse } from "next/server";
import formatSheet from "@/utils/server/formatSheet";

export async function POST(req) {
    try {
        const formData = await req.formData();
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

        const requiredFields = ["name", "rollno", "email", "college_email", "phone", "course", "branch", "batch", "backlogs", "10th_percentage", "12th_percentage", "graduation_percentage"];

        const formattedData = await formatSheet(file, requiredFields);

        // Here you would typically save the formatted data to your database
        return NextResponse.json({ data: formattedData }, { status: 200 });
    } catch (err) {
        return NextResponse.json(err.error, { status: err.status || 500 });
    }
}