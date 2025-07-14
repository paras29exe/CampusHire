'use server';

import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    try {
        const data = await Job.find({
            status: { $in: ['active', 'expired'] } // Only fetch active or expired jobs
        })
        .sort({ createdAt: -1 }) // Sort by creation date in descending order
        .select('_id company createdAt'); // Exclude version key

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