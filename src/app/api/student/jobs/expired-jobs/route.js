'use server';

import { NextResponse } from "next/server";
import { Job } from "@/db/models/jobModel";
import { Application } from "@/db/models/applicationsModel";
import { withDB } from "@/utils/server/dbHandler";
import { Types } from "mongoose";

export const GET = withDB(async (req) => {
    try {
        const reqUser = JSON.parse(req.headers.get("user") || "{}");
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 50; // Number of jobs per page

        const appliedJobs = await Application.find({ applicant: reqUser._id })

        // merge multiple jobs with same jobId
        const jobIds = appliedJobs.map(app => app.jobId.toString());
        const strJobIds = [...new Set(jobIds)];

        const uniqueJobIds = strJobIds.map(id => Types.ObjectId.createFromHexString(id));

        const expiredJobs = await Job.aggregate([
            {
                $match: {
                    _id: { $nin: uniqueJobIds },
                    $or: [
                        { last_date_to_apply: { $lt: new Date() } },
                        { status: 'expired' }
                    ] 
                }
            },{
                $sort: { createdAt: -1 } 
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit // Limit to 50 expired jobs
            },
            {
                $project: {
                    _id: 1,
                    company: 1,
                    job_details: 1,
                    last_date_to_apply: 1,
                    total_roles: { $size: "$job_roles" }
                }
            }
        ])

        return NextResponse.json({ data: expiredJobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching expired jobs:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
});