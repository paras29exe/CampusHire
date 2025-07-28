'use server';

// import { Student } from "@/db/models/studentModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import { Job } from "@/db/models/jobModel";
import mongoose from "mongoose";
import { Student } from "@/db/models/studentModel";

export const GET = withDB(async (req) => {
    try {
        const student = JSON.parse(req.headers.get('user') || '{}');
        const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
        const limit = parseInt(req.nextUrl.searchParams.get('limit')) || 50;

        const studentData = await Student.findById(student._id, 'course branch batch')
        if (!studentData) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }
        const { course, branch, batch } = studentData;

        const studentCourse = (branch ? `${course}-${branch}` : course)?.toLowerCase();
        const studentBatch = batch?.toLowerCase();

        // Find all active jobs the student has NOT applied to
        const activeJobs = await Job.aggregate([
            {
                $match: {
                    status: 'active',
                    last_date_to_apply: { $gt: new Date() }, // Ensure the job is still open for applications
                    "eligibility_criteria.courses": { $in: [studentCourse] },
                    "eligibility_criteria.batches": { $in: [studentBatch] }
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

            },{
                $sort: { createdAt: -1 } // Sort by job creation date
            },
            {
                $skip: (page - 1) * limit // Skip the number of jobs based on the page
            },
            {
                $limit: limit
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

        const totalJobs = await Job.countDocuments({status: 'active', last_date_to_apply: { $gt: new Date() }})
        
        return NextResponse.json({
            message: "Active jobs fetched successfully",
            data: activeJobs,
            pagination: {
                totalJobs,
                currentPage: page,
                totalPages: Math.ceil(totalJobs / limit),
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: "An error occurred while fetching active jobs",
        }, { status: 500 }); 
    }
});