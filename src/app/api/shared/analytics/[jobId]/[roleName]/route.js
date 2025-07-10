'use server';
import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export const GET = withDB(async (req, { params }) => {
    try {
        const { jobId } = await params;
        const roleId = req.nextUrl.searchParams.get("roleId");
        const department = req.nextUrl.searchParams.get("department");
        const course = req.nextUrl.searchParams.get("course");
        const branch = req.nextUrl.searchParams.get("branch");
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 50; // Number of applicants per page

        if (!jobId || !roleId) {
            return NextResponse.json({ message: "Job ID and Role ID are required" }, { status: 400 });
        }
        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(roleId)) {
            return NextResponse.json({ message: "Invalid Job ID or Role ID format" }, { status: 400 });
        }

        const job = await Job.findById(jobId)

        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        let applicants = await Application.find({ jobId, role: roleId })
            .sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .skip((page - 1) * limit) // Pagination: skip to the correct page
            .limit(limit) // Limit the number of applicants returned
            .populate('applicant', 'name rollno email college_email phone course branch department batch')
        
        // Filter applicants based on optional query parameters
        if (department) {
            applicants = applicants.filter(applicant => applicant.applicant.department === department);
        }
        if (course) {
            applicants = applicants.filter(applicant => applicant.applicant.course === course);
        }
        if (branch) {
            applicants = applicants.filter(applicant => applicant.applicant.branch === branch);
        }

        if ((!applicants || applicants.length === 0) && page === 1) {
            return NextResponse.json({ message: "No applicants found for this Company and role" }, { status: 404 });
        }

        // total number of applicants
        const totalApplicants = applicants.length;

        return NextResponse.json({ data: applicants,
            pagination: {
                totalApplicants,
                currentPage: page,
                totalPages: Math.ceil(totalApplicants / limit),
            }
         }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while fetching applicants"
        }, { status: err.status || 500 });
    }   
});