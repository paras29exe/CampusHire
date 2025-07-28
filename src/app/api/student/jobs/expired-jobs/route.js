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

        const studentData = await Application.findOne({ applicant: reqUser._id }, 'course branch batch');
        if (!studentData) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        const { course, branch, batch } = studentData;

        const studentCourse = (branch ? `${course}-${branch}` : course)?.toLowerCase();
        const studentBatch = batch?.toLowerCase();

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
                    ],
                    'eligibility_criteria.courses': { $in: [studentCourse] },
                    'eligibility_criteria.batches': { $in: [studentBatch] }
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

        // Count total expired jobs for pagination metadata
        const totalExpiredJobs = await Job.countDocuments({
            _id: { $nin: uniqueJobIds },
            $or: [
                { last_date_to_apply: { $lt: new Date() } },
                { status: 'expired' }
            ]
        });

        return NextResponse.json({
            message: "Expired jobs fetched successfully",
            data: expiredJobs,
            pagination: {
                totalJobs: totalExpiredJobs,
                currentPage: page,
                totalPages: Math.ceil(totalExpiredJobs / limit),
            }
         }, { status: 200 });
    } catch (error) {
        console.error("Error fetching expired jobs:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
});