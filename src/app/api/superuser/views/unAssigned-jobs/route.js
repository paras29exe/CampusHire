import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
    const limit = 20; // Number of jobs per page
    const skip = (page - 1) * limit;

    try {
        // Fetch unpublished jobs in latest-first order with pagination
        const jobs = await Job.find({ status: 'unAssigned' })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .skip(skip)
            .limit(limit);

        // Count total unpublished jobs for pagination metadata
        const totalJobs = await Job.countDocuments({ status: 'unpublished' });

        return NextResponse.json({
            message: "UnAssigned jobs fetched successfully",
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
            error: "An error occurred while fetching unAssigned jobs",
        }, { status: 500 });
    }
});