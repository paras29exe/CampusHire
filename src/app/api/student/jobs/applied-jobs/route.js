'use server'

import { Application } from "@/db/models/applicationsModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";

export const GET = withDB(async (req) => {
    try {
        const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
        const limit = 50; // Number of jobs per page
        const student = JSON.parse(req.headers.get('user') || '{}');

        // Find all applications by the student
        const appliedJobs = await Application.aggregate([
            {
                $match: {
                    applicant: mongoose.Types.ObjectId.createFromHexString(student._id),
                    status: { $in: ["applied", "rejected"] }
                }
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "jobData"
                }
            },
            {
                $unwind: "$jobData"
            },
            {
                $addFields: {
                    matchedRole: {
                        $first: {
                            $filter: {
                                input: "$jobData.job_roles",
                                as: "role",
                                cond: { $eq: ["$$role._id", "$roleId"] }
                            }
                        }
                    }
                }
            },
            {
                $sort: { "jobData.createdAt": -1 } // Sort by job creation date
            },
            {
                $skip: (page - 1) * 50 // Pagination
            },
            {
                $limit: limit // Limit to 50 applied jobs
            },
            {
                $project: {
                    _id: 0,
                    jobId: "$jobData._id",
                    roleId: "$matchedRole._id",
                    companyName: "$jobData.company.name",
                    companyWebsite: "$jobData.company.website",
                    roleApplied: "$matchedRole.role",
                    appliedOn: "$createdAt",
                    nextRound: "$matchedRole.round_details.name",
                    package: "$matchedRole.package_details.package",
                    location: "$jobData.job_details.job_location",
                    driveType: "$matchedRole.round_details.type",
                    status: 1
                }
            }
        ])

        // count for pagination
        const totalAppliedJobs = await Application.countDocuments({
            applicant: mongoose.Types.ObjectId.createFromHexString(student._id),
            status: { $in: ["applied", "rejected"] }
        });

        return NextResponse.json({
            message: "Applied jobs fetched successfully",
            data: appliedJobs,
            pagination: {
                totalJobs: totalAppliedJobs,
                currentPage: page,
                totalPages: Math.ceil(totalAppliedJobs / limit),
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: error.name || "An error occurred while fetching active jobs",
        }, { status: 500 });
    }
});