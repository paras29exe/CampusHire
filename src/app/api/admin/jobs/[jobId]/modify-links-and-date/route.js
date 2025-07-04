import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = withDB(async (req, { params }) => {
    try {
        const { jobId } = params;

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
        const reqUser = req.headers.get("user");

        if (!job.assigned_to.some(id => id.toString() === reqUser._id.toString())) {
            return NextResponse.json({
                message: "You are not authorised by superuser to modify this job"
            }, { status: 403 });
        }
        
        const form = await req.formData();
        const body = form && Object.fromEntries(form.entries());
        const { links, lastDate } = body;

        // Update job links and last date to apply
        job.links = {
            ...job.links,
            ...(links ? JSON.parse(links) : {})
        };
        job.last_date_to_apply = lastDate ? new Date(lastDate) : job.last_date_to_apply;

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