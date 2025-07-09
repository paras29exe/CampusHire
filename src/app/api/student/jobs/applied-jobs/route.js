'use server'

import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";

export const GET = withDB(async (req) => {
    try {
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


        return NextResponse.json({
            message: "Applied jobs fetched successfully",
            data: appliedJobs,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: error.name || "An error occurred while fetching active jobs",
        }, { status: 500 });
    }
});