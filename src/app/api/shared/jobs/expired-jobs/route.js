'use server';

import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
    const limit = 20; // Number of jobs per page

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return NextResponse.json({
            error: "Invalid pagination parameters",
            message: "Page and limit must be positive integers",
        }, { status: 400 });
    }
    
    const skip = (page - 1) * limit;

    try {
        // Fetch expired jobs in latest-first order with pagination
        const jobs = await Job.find({ status: 'expired' })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .skip(skip)
            .limit(limit);

        // Count total expired jobs for pagination metadata
        const totalJobs = await Job.countDocuments({ status: 'expired' });

        return NextResponse.json({
            message: "Expired jobs fetched successfully",
            data: jobs,
            pagination: {
                totalJobs,
                currentPage: page,
                totalPages: Math.ceil(totalJobs / limit),
            },
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "Unexpected error occurred",
            message: "An error occurred while fetching expired jobs",
        }, { status: 500 });
    }
});