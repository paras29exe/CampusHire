'use server';

import { Job } from "@/db/models/jobModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";

export const GET = withDB(async (req) => {
    try {
        const jobId = req.nextUrl.searchParams.get("jobId");
        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
        }
        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID format" }, { status: 400 });
        }

        const data = await Job.findOne({_id: jobId})
        .select('company eligibility_criteria job_roles.role job_roles._id')

        return NextResponse.json({
            message: "Jobs fetched successfully",
            data: data || [],
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
        }, { status: 500 });
    }
});