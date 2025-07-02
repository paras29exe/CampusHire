// import extractPdf from "@/utils/server/extractPdf";
import { NextResponse } from "next/server";

export async function POST(req) {
    // https://pdfprocessing-script.onrender.com/process-pdf upload PDF file to this endpoint
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file was uploaded" }, { status: 400 });
        }

        // Check if the file is a PDF
        if (!file.name.endsWith(".pdf")) {
            return NextResponse.json({ message: "Invalid file type. Please upload a PDF file." }, { status: 400 });
        }

        // less than 50 mb file
        if (file.size > 16 * 1024 * 1024) {
            return NextResponse.json({ message: "File size exceeds the limit of 16 MB." }, { status: 400 });
        }

        // Here you would typically process the PDF file
        // const data = await extractPdf()
        // For demonstration, we will just return a success message
        return NextResponse.json({ message: "PDF file processed successfully", data: "" }, { status: 200 });
    }catch (err) {
        return NextResponse.json({ error: err.error, message: err.message || "An error occurred while processing the PDF file" }, { status: err.status || 500 });
    }
}