'use server';

// import extractPdf from "@/utils/server/extractPdf";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";
import axios from "axios";

export const POST = withDB(async (req) => {
    // https://pdfprocessing-script.onrender.com/process-pdf upload PDF file to this endpoint
    try {
        const formData = await req.formData();

        const res = await axios.post("https://pdfprocessor-llm-script.onrender.com/process-pdf", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // Ensure credentials are sent if needed
        })

        const data = res.data?.data;

        data.eligibility_criteria = undefined; // Remove eligibility criteria if not needed

        // Ensure `data` is an object before passing to Job.create
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data format received from PDF processing script');
        }

        // make job in database with the data received from the PDF processing script
        const job = await Job.create(data);

        return NextResponse.json({ message: "PDF file processed successfully", data: {}, jobId: job._id }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.error,
            message: err.message || "An error occurred while processing the PDF file"
        },{ 
            status: err.status || 500 
        });
    }
});