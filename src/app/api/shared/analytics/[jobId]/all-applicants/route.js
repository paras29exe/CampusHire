'use server';

import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = withDB(async (req, { params }) => {
    try {
        const { jobId } = params;
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 50; // Number of applicants per page

        // all for this job
        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
        }
        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID format" }, { status: 400 });
        }
        const job = await Job.findById(jobId);

        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        // Fetch all applicants for the job
        const applicants = await Application.find({ jobId })
            .sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .skip((page - 1) * limit) // Pagination: skip to the correct page
            .limit(limit) // Limit the number of applicants returned
            .populate('applicant', 'name rollno email college_email phone course branch batch')

        if ((!applicants || applicants.length === 0) && page === 1) {
            return NextResponse.json({ message: "No applicants found for this job" }, { status: 404 });
        }

        // total number of applicants
        const totalApplicants = applicants.length;

        return NextResponse.json({ 
            data: applicants,
            pagination: {
                totalApplicants,
                currentPage: page,
                totalPages: Math.ceil(totalApplicants / limit),
            }
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "Unexpected error occurred",
            message: "An error occurred while fetching applicants"
        }, { status: err.status || 500 });
    }
});