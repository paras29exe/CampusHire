'use server';

// import extractPdf from "@/utils/server/extractPdf";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";

export const POST = withDB(async (req) => {
    // https://pdfprocessing-script.onrender.com/process-pdf upload PDF file to this endpoint
    try {
        const formData = await req.formData();

        const file = formData.get('file');
        if (!file || file.size === 0) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Check if the file is a PDF
        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Invalid file type", message: "Please upload a valid PDF file." }, { status: 400 });
        }
        // Check if the file size is less than 10MB
        if (file.size > 15 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large", message: "Please upload a PDF file smaller than 15MB." }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate a hash of the file to check for duplicates
        const fileHash = crypto.createHash('sha256').update(buffer).digest('hex');

        // Check if a job with the same file hash already exists
        const existingJob = await Job.findOne({ fileHash })

        if (existingJob) {
            return NextResponse.json({
                error: "Duplicate file",
                message: "File/Job already exists. Try another or Remove existing job."
            }, { status: 400 });
        }

        let res;
        try {
            res = await axios.post("https://pdfprocessor-llm-script.onrender.com/process-pdf", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Ensure credentials are sent if needed
            })
        } catch (error) {

            if (error.response?.data?.message.startsWith("large_no_of_pages")) {
                return NextResponse.json({
                    error: "PDF file has too many pages",
                    message: "Please upload a PDF file with fewer than 5 pages."
                }, { status: 400 });
            }
            if (error.response?.data?.message.startsWith("irrelevant_data")) {
                return NextResponse.json({
                    error: "PDF file contains irrelevant data",
                    message: "No Job data was found in provided pdf."
                }, { status: 400 });
            }

            return NextResponse.json({
                error: error.response?.data?.error || "Failed to process PDF file",
                message: error.response?.data?.message || "An error occurred while processing the PDF file"
            }, { status: 500 });
        }


        const data = res.data?.data;

        data.fileHash = fileHash; // Store the file hash in the job data
        data.eligibility_criteria = undefined; // Remove eligibility criteria if not needed

        // Ensure `data` is an object before passing to Job.create
        if (typeof data !== 'object' || data === null) {
            return NextResponse.json({
                error: "Invalid data format",
                message: "The processed data from the PDF is not in the expected format."
            }, { status: 400 });
        }

        // make job in database with the data received from the PDF processing script
        const job = await Job.create(data);

        return NextResponse.json({ message: "PDF file processed successfully", data: {}, jobId: job._id }, { status: 200 });
    } catch (err) {
        console.error("Error in PDF processing:", err);
        return NextResponse.json({
            error: err.error,
            message: err.response?.data.message || err.message || "An error occurred while processing the PDF file"
        }, {
            status: err.status || 500
        });
    }
});