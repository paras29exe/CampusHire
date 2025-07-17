'use server'

import { Application } from "@/db/models/applicationsModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";

export const GET = withDB(async (req) => {
    try {
        const student = JSON.parse(req.headers.get('user') || '{}');
        const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 50;

        // Find all applications by the student
        const shortlistedJobs = await Application.aggregate([
            {
                $match: {
                    applicant: new mongoose.Types.ObjectId(student._id),
                    status: "shortlisted",
                },
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "jobData",
                },
            },
            { $unwind: "$jobData" },
            {
                $addFields: {
                    matchedRole: {
                        $first: {
                            $filter: {
                                input: "$jobData.job_roles",
                                as: "matchedRole",
                                cond: { $eq: ["$$matchedRole._id", "$roleId"] },
                            },
                        },
                    },
                },
            },
            { $sort: { "jobData.createdAt": -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
                $project: {
                    _id: 0,
                    jobId: "$jobData._id",
                    roleId: "$matchedRole._id",
                    companyName: "$jobData.company.name",
                    companyWebsite: "$jobData.company.website",
                    roleName: "$matchedRole.role",
                    appliedOn: "$createdAt",
                    nextRoundName: "$matchedRole.round_details.name",
                    nextRoundDate: "$matchedRole.round_details.date",
                    package: "$matchedRole.package_details.package", // verify this path!
                    location: "$jobData.job_details.job_location",
                    driveType: "$matchedRole.round_details.type",
                    status: 1,
                },
            },
        ]);

        // Count total shortlisted jobs for pagination metadata
        const totalShortlistedJobs = await Application.countDocuments({
            applicant: student._id,
            status: "shortlisted",
        });


        return NextResponse.json({
            message: "Shortlisted jobs fetched successfully",
            data: shortlistedJobs,
            pagination: {
                totalJobs: totalShortlistedJobs,
                currentPage: page,
                totalPages: Math.ceil(totalShortlistedJobs / limit),
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: error.name || "An error occurred while fetching active jobs",
        }, { status: 500 });
    }
});