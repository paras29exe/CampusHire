'use server';

import { Application } from "@/db/models/applicationsModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import mongoose, { Types } from "mongoose";
import { Job } from "@/db/models/jobModel";
import { Student } from "@/db/models/studentModel";

export const GET = withDB(async (req) => {
    try {
        const jobId = req.nextUrl.searchParams.get("jobId");
        const paramCourse = req.nextUrl.searchParams.get("course");
        const paramBatch = req.nextUrl.searchParams.get("batch");
        const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
        const limit = 500; // Number of applicants per page

        const [pCourse, pBranch] = paramCourse?.split('-') || [];

        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
        }
        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID or Role ID format" }, { status: 400 });
        }

        const job = await Job.findOne({
            _id: jobId,
            status: { $in: ['active', 'expired'] } // Only fetch active or expired jobs
        });

        if (!job) {
            return NextResponse.json({ message: "Job is either missing or is not published yet" }, { status: 404 });
        }

        if(!job.eligibility_criteria.batches.length || !job.eligibility_criteria.courses.length) {
            return NextResponse.json({ message: "Data for this job is incomplete" }, { status: 404 });
        }

        const isValidBatch = job.eligibility_criteria.batches.some(b => b == paramBatch);
        if (paramBatch && !isValidBatch) {
            return NextResponse.json({ message: "Specified batch was not eligible for this Job" }, { status: 400 });
        }
        const eligibleBatches = paramBatch ? [paramBatch] : job.eligibility_criteria.batches;

        let eligibleConditions = job.eligibility_criteria.courses.map(c => {
            const [course, branch] = c.split('-');
            return branch
                ? { course: new RegExp(`^${course}$`, 'i'), branch: new RegExp(`^${branch}$`, 'i') }
                : { course: new RegExp(`^${course}$`, 'i') };
        });

        if (paramCourse) {
            const isValidCourse = job.eligibility_criteria.courses.some(c => c.toLowerCase() === paramCourse.toLowerCase());

            if (!isValidCourse) {
                return NextResponse.json({ message: "Specified course was not eleigible for this Job" }, { status: 400 });
            }

            eligibleConditions = [{
                course: new RegExp(`^${pCourse}$`, 'i'),
                ...(pBranch ? { branch: new RegExp(`^${pBranch}$`, 'i') } : {})
            }]
        }

        // find all students who have applied for the job, then exclude them from total students to get non-applicants
        const applications = await Application.find({ jobId })
            .distinct('applicant');

        const nonApplicants = await Student.aggregate([
            {
                $match: {
                    batch: { $in: eligibleBatches },
                    $or: eligibleConditions,
                    _id: { $nin: applications },
                }
            },
            {
                $facet: {
                    non_applicants: [
                        { $sort: { createdAt: -1 } }, // Sort applicants by appliedAt date
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                'role': 0,
                                'password': 0,
                                '__v': 0,
                                'createdAt': 0,
                                'updatedAt': 0,
                            }
                        }
                    ],
                    groupedByCourse: [
                        {
                            $group: {
                                _id: {
                                    $cond: {
                                        if: { $or: [{ $eq: ["$branch", null] }, { $eq: ["$branch", ""] }] },
                                        then: { $toUpper: "$course" },
                                        else: {
                                            $concat: [{ $toUpper: "$course" }, "-", { $toUpper: "$branch" }]
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
        ])

        const totalNonApplicants = nonApplicants[0].non_applicants.length;

        // group all the courses that were eligible wheather students exist or not
        if(!pCourse) {
            const groupedCoursesMap = new Map();
            nonApplicants[0].groupedByCourse.forEach(item => groupedCoursesMap.set(item.course.toUpperCase(), item.count));

            const finalGrouped = job.eligibility_criteria.courses.map(c => {
                const key = c.toUpperCase(); // normalize
                return {
                    course: key,
                    count: groupedCoursesMap.get(key) || 0
                };
            });
            nonApplicants[0].groupedByCourse = finalGrouped;
        }else {
            // if course is specified, then only return that course
            nonApplicants[0].groupedByCourse.length === 0 && nonApplicants[0].groupedByCourse.push({
                course: paramCourse.toUpperCase(),
                count: nonApplicants[0].non_applicants.length || 0
            })
        }

        return NextResponse.json({
            data: nonApplicants[0],
            pagination: {
                totalNonApplicants,
                currentPage: page,
                totalPages: Math.ceil(totalNonApplicants / limit)
            }
        });

    } catch (error) {
        return NextResponse.json({ message: error.message || 'Unexpected Error' }, { status: 500 });
    }
});