'use server';

import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    let page = req.nextUrl.searchParams.get("page");
    const limit = 50; // Number of jobs per page

    // Default to page 1 if not provided
    page = parseInt(page) || 1;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        return NextResponse.json({
            error: "Invalid pagination parameters",
            message: "Page and limit must be positive integers",
        }, { status: 400 });
    }

    try {
        // Fetch unassigned jobs in latest-first order with pagination
        const jobs = await Job.find({ status: 'unassigned' })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .skip((page - 1) * limit)
            .limit(limit);

        // Count total jobs for pagination metadata
        const totalJobs = await Job.countDocuments({ status: 'unassigned' });

        return NextResponse.json({
            message: "Unassigned jobs fetched successfully",
            data: jobs,
            pagination: {
                totalJobs,
                currentPage: page,
                totalPages: Math.ceil(totalJobs / limit),
            },
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while fetching unassigned jobs",
        }, { status: 500 });
    }
});