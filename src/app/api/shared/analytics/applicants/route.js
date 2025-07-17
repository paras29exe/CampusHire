'use server';

import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";


export const GET = withDB(async (req) => {
    try {
        const jobId = req.nextUrl.searchParams.get("jobId");
        const roleId = req.nextUrl.searchParams.get("roleId");
        const paramCourse = req.nextUrl.searchParams.get("course");
        const paramBatch = req.nextUrl.searchParams.get("batch");
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 500; // Number of applicants per page

        const [course, branch] = paramCourse?.split('-') || [null, null];

        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
        }
        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID or Role ID format" }, { status: 400 });
        }

        if (roleId && !mongoose.isValidObjectId(roleId)) {
            return NextResponse.json({ message: "Invalid Role ID format" }, { status: 400 });
        }

        const job = await Job.findOne({
            _id: jobId,
            status: { $in: ['active', 'expired'] } // Only fetch active or expired jobs
        })

        if (!job) {
            return NextResponse.json({ message: "Job is either missing or is not published yet" }, { status: 404 });
        }

        if (!job.eligibility_criteria.batches.length || !job.eligibility_criteria.courses.length) {
            return NextResponse.json({ message: "Data for this job is incomplete" }, { status: 404 });
        }

        // if specific batch is provided, filter by that batch
        const isValidBatch = job.eligibility_criteria.batches.some(b => b == paramBatch);
        if (paramBatch && !isValidBatch) {
            return NextResponse.json({ message: "Specified batch was not eligible for this Job" }, { status: 400 });
        }

        // check if the given course was even eligible for the job 
        const isValidCourse = job.eligibility_criteria.courses.some(c => c.toLowerCase() === paramCourse?.toLowerCase());
        if (paramCourse && !isValidCourse) {
            return NextResponse.json({ message: "Specified course was not eligible for this Job" }, { status: 400 });
        }

        const query = { jobId: Types.ObjectId.createFromHexString(jobId) };
        if (roleId) {
            query.roleId = Types.ObjectId.createFromHexString(roleId);
        }

        const eligibleBatches = paramBatch ? [paramBatch] : job.eligibility_criteria.batches;

        const pipeline = [
            { $match: query },
            {
                $lookup: {
                    from: "students",
                    localField: "applicant",
                    foreignField: "_id",
                    as: "applicant"
                }
            },
            { $unwind: "$applicant" },
            { $match: { "applicant.batch": { $in: eligibleBatches } } },
            ...(course ? [{ $match: { "applicant.course": { $regex: new RegExp(`${course}`, 'i') } } }] : []),
            ...(branch ? [{ $match: { "applicant.branch": { $regex: new RegExp(`${branch}`, 'i') } } }] : []),
            {
                $facet: {
                    applicants: [
                        { $sort: { createdAt: -1 } }, // Sort applicants by appliedAt date
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $replaceRoot: { newRoot: "$applicant" }
                        }
                    ],
                    groupedByCourse: [
                        {
                            $group: {
                                _id: {
                                    $cond: {
                                        if: { $or: [{ $eq: ["$applicant.branch", null] }, { $eq: ["$applicant.branch", ""] }] },
                                        then: { $toUpper: "$applicant.course" },
                                        else: {
                                            $concat: [
                                                { $toUpper: "$applicant.course" },
                                                "-",
                                                { $toUpper: "$applicant.branch" }
                                            ]
                                        }
                                    }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 } },
                        {
                            $project: {
                                _id: 0,
                                course: "$_id",
                                count: 1
                            }
                        }
                    ]
                }
            },
            
        ];

        const data = await Application.aggregate(pipeline);

        // total number of applicants
        const totalApplicants = data[0].applicants.length;

        return NextResponse.json({
            data: data[0],
            pagination: {
                totalApplicants,
                currentPage: page,
                totalPages: Math.ceil(totalApplicants / limit),
            }
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
            error: "An error occurred while fetching applicants"
        }, { status: err.status || 500 });
    }
});
