'use server';

import { Assignment } from "@/db/models/assignmentsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const DELETE = withDB(async (req) => {
    const jobId = req.nextUrl.searchParams.get("jobId");

    if (!jobId) {
        return NextResponse.json({
            error: "Job ID is required",
            message: "Please provide a valid job ID to delete."
        }, { status: 400 });
    }

    try {
        // Find the job by ID and delete it
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return NextResponse.json({
                error: "Job not found",
                message: `No job found with ID ${jobId}.`
            }, { status: 404 });
        }

        await Assignment.deleteMany({company: jobId})

        return NextResponse.json({
            message: "Job deleted successfully",
            data: {}
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "An error occurred while deleting the job",
            message: "Failed to delete the job."
        }, { status: 500 });
    }
});