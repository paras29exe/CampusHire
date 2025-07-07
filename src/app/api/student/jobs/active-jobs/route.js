'use server';

import { Student } from "@/db/models/studentModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";

export const GET = withDB(async (req) => {
    try {
        const student = JSON.parse(req.headers.get('student') || '{}');

        // Find all applications by the student
        const applications = await Application.find({ applicant: student._id })
            .select('jobId')

        // Extract job IDs the student has already applied to
        const appliedJobIds = applications.map(app => app.jobId);

        // Find all active jobs the student has NOT applied to
        const activeJobs = await Job.find({
            _id: { $nin: appliedJobIds },
            status: 'active',
        });

        if (!activeJobs || activeJobs.length === 0) {
            return NextResponse.json({ message: "We are sorry! No active jobs found for You." }, { status: 404 });
        }
        
        return NextResponse.json({
            message: "Active jobs fetched successfully",
            data: activeJobs,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message || "Unexpected error occurred",
            message: "An error occurred while fetching active jobs",
        }, { status: 500 }); 
    }
});