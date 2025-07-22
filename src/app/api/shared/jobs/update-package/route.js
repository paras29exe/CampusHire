'use server';

import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const PUT = withDB(async (req, res) => {
    const jobId = req.nextUrl.searchParams.get("jobId");
    const { jobRoles, jobDetails } = await req.json();

    if (!jobId || !jobRoles || !jobDetails) {
        return NextResponse.json({ error: "Missing jobId or jobRoles or Overall Package" }, { status: 400 });
    }

    try {
        const job = await Job.findByIdAndUpdate(
            jobId,
            { job_roles: jobRoles, job_details: jobDetails },
            { new: true, runValidators: true }
        );

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Job details updated successfully", job });
    } catch (error) {
        console.error("Error updating job details:", error);
        return NextResponse.json({ error: "Failed to update job details" }, { status: 500 });
    }
});