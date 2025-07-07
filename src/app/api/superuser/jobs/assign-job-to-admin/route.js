'use server';

import { Assignment } from "@/db/models/assignmentsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const POST = withDB(async (req) => {
    const jobId = req.nextUrl.searchParams.get("jobId");
    const adminIds = await req.json()
    const currUser = JSON.parse(req.headers.get("user"));

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

        // Assign the job to the specified admins
        // create assignments for each admin
        for (const adminId of adminIdsArray) {
            if (!adminId) continue; // Skip if adminId is empty

            const assignment = new Assignment({
                company: job._id,
                assigned_to: adminId,
                assigned_by: currUser._id, // Assuming currUser is the user making the request
                status: 'pending', // Set initial status to pending
            });

            await assignment.save();
        }

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