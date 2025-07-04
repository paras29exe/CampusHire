'use server';

import { Assignment } from "@/db/models/assignmentsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const POST = withDB(async (req, { params }) => {
    const { jobId } = params;

    try {
        // Validate jobId
        if (!jobId) {
            return NextResponse.json({
                error: "Job ID is required",
            }, { status: 400 });
        }

        // Find the job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({
                error: "Job not found",
            }, { status: 404 });
        }

        // Check if the job is already published
        if (job.status === 'active') { // Assuming 'active' is the status for published jobs
            return NextResponse.json({
                message: "Job is already published",
                data: job,
            }, { status: 200 });
        }

        if(job.eligibility_criteria.batch == [] || job.eligibility_criteria.courses == {}){
            return NextResponse.json({
                error: "Job cannot be published without eligibility criteria",
            }, { status: 400 });
        }

        // Check if the job has at least one job role
        if (!job.job_roles || job.job_roles.length === 0) {
            return NextResponse.json({
                error: "Job must have at least one job role to be published",
            }, { status: 400 });
        }

        if(job.links && job.links.company_link && !job.links.college_link){
            return NextResponse.json({
                error: "Job can not be published without company and college apply links",
            }, { status: 400 });
        }

        // last_date_to_apply should be in the future
        if (job.last_date_to_apply && new Date(job.last_date_to_apply) <= new Date()) {
            return NextResponse.json({
                error: "Job cannot be published without a last date or a past last date to apply",
            }, { status: 400 });
        }

        // Update the job status to 'published'
        job.status = 'active'; // Assuming 'active' is the status for published jobs

        await Assignment.updateMany(
            { company: jobId },
            { $set: { status: 'completed' } } // Update all assignments related to this job to 'assigned'
        );
        await job.save();

        return NextResponse.json({
            message: "Job published successfully",
            data: job,
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            error: err.message || "Unexpected error occurred",
            message: "An error occurred while publishing the job",
        }, { status: 500 });
    }
});