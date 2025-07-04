'use server';

import { Assignment } from "@/db/models/assignmentsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const POST = withDB(async (req) => {
    const jobId = req.nextUrl.searchParams.get("jobId");
    const adminIds = await req.formData().then(formData => formData.get("adminIds"));

    if (!jobId || !adminIds) {
        return NextResponse.json({ error: "Job ID and Admin IDs are required" }, { status: 400 });
    }

    try {
        // Find the job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        // Ensure adminIds is an array
        const adminIdsArray = Array.isArray(adminIds) ? adminIds : [adminIds];
        const currUser = req.headers.get("user");

        // Assign the job to the specified admins
        await Assignment.create({
            company: job._id,
            assigned_to: adminIdsArray,
            assigned_by: currUser._id, // Assuming the user is the superuser making the request
            status: 'assigned'
        });
        job.assigned_to = adminIdsArray;
        await job.save();

        return NextResponse.json({ message: "Job assigned to admins successfully", job }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "Unexpected error occurred",
            message: "An error occurred while assigning the job"
        }, { status: err.status || 500 });
    }
})