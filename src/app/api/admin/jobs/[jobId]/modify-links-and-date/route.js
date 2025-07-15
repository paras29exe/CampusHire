'use server';

import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = withDB(async (req, { params }) => {
    try {
        const { jobId } = await params;

        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required", }, {status: 400 });
        }

        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID format", }, { status: 400 });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return NextResponse.json({ message: "Job/Company not found"}, {status: 404 });
        }

        // Check if the user is authorized to modify the job
        const reqUser = JSON.parse(req.headers.get("user"));

        if (!job.assigned_to.some(id => id.toString() === reqUser._id.toString())) {
            return NextResponse.json({
                message: "You are not authorised by superuser to modify this job"
            }, { status: 403 });
        }
        
        const { college_link, company_link, last_date_to_apply } = await req.json();

        // Validate links and last date
        if (college_link && typeof college_link !== 'string') {
            return NextResponse.json({ message: "Invalid college link format" }, { status: 400 });
        }
        if (company_link && typeof company_link !== 'string') {
            return NextResponse.json({ message: "Invalid company link format" }, { status: 400 });
        }   
        if (last_date_to_apply && isNaN(new Date(last_date_to_apply).getTime())) {
            return NextResponse.json({ message: "Invalid last date format" }, { status: 400 });
        }

        // Update job links and last date to apply
        job.links = {
            college_link: college_link ? college_link.trim() : job.links.college_link,
            company_link: company_link ? company_link.trim() : job.links.company_link,
        };
        job.last_date_to_apply = last_date_to_apply ? new Date(last_date_to_apply) : job.last_date_to_apply;

        await job.save();

        return NextResponse.json({
            message: "Job updated successfully",
            data: job,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Internal Server Error",
            error: "An unexpected error occurred",
        }, {
            status: 500,
        });
    }
});