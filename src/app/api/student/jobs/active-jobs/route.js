'use server';

// import { Student } from "@/db/models/studentModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import { Job } from "@/db/models/jobModel";
import mongoose from "mongoose";

export const GET = withDB(async (req) => {
    try {
        const student = JSON.parse(req.headers.get('user') || '{}');

        // Find all active jobs the student has NOT applied to
        const activeJobs = await Job.aggregate([
            {
                $match: {
                    status: 'active',
                    last_date_to_apply: { $gt: new Date() }, // Ensure the job is still open for applications
                }
            },
            {
                $lookup: {
                    from: "applications",
                    let: { jobId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$jobId", "$$jobId"] },
                                        { $eq: ["$applicant", mongoose.Types.ObjectId.createFromHexString(student._id)] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "applicationData"
                }
            },
            {
                // give count that for how many roles student has applied
                $addFields: {
                    appliedRolesCount: {
                        $size: "$applicationData"
                    }
                }

            },
            {
                $project: {
                    company: 1,
                    eligibility_criteria: 1,
                    job_details: 1,
                    last_date_to_apply: 1,
                    appliedRolesCount: 1,
                    job_roles: 1,
                }
            }
        ])
        
        return NextResponse.json({
            message: "Active jobs fetched successfully",
            data: activeJobs,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: "An error occurred while fetching active jobs",
        }, { status: 500 }); 
    }
});