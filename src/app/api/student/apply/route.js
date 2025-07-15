import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";
import { NextResponse } from "next/server";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";
import { Student } from "@/db/models/studentModel";


export const POST = withDB(async (req, {params}) => {
    try {
        const student = JSON.parse(req.headers.get('user') || '{}');
        const jobId = await req.nextUrl.searchParams.get('jobId');
        const roleId = await req.nextUrl.searchParams.get('roleId');
        
        if (!jobId || !roleId) {
            return NextResponse.json({ error: "Job ID and Role ID are required" }, { status: 400 });
        }

        // check if they are mongo ObjectId
        if(!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(roleId)) {
            return NextResponse.json({ error: "Invalid Job ID or Role ID format" }, { status: 400 });
        }

        // Check if the student has already applied for this job
        const existingApplication = await Application.findOne({
            applicant: student._id,
            jobId,
            roleId
        });

        if (existingApplication) {
            return NextResponse.json({ message: "You have already applied for this job." }, { status: 400 });
        }

        // Check if the job exists and is active
        const job = await Job.findById(jobId)
            .select('job_roles status');
        
        if (!job || job.status !== 'active') {
            return NextResponse.json({ error: "Job not found or is not active" }, { status: 404 });
        }
        // Check if the role exists in the job's roles
        const roleExists = job.job_roles.some(role => role._id.toString() === roleId);
        if (!roleExists) {
            return NextResponse.json({ error: "Role not found in the job" }, { status: 404 });
        }

        const applicant = await Student.findById(student._id)
            .select('roll_number')

        // Create a new application
        const newApplication = new Application({
            applicant: student._id,
            applicantRollNumber: applicant.roll_number,
            jobId,
            roleId
        });

        await newApplication.save({ validateBeforeSave: true });

        return NextResponse.json({
            message: "Application submitted successfully",
            data: newApplication
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: error.name || "An error occurred while applying for the job"
        }, { status: 500 });
    }
});