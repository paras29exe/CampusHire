import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = withDB(async (req, { params }) => {
    try {
        const { jobId } = params;
        
        if (!jobId) {
            return NextResponse.json({ message: "Job ID is required", }, { status: 400, });
        }
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID format", }, { status: 400, });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json({ message: "Job/company not found", }, { status: 404 });
        }

        // Check if the user is authorized to modify the job , use job.assigned_to array to find reqUser._id in it
        const reqUser = req.headers.get("user");
        if (!job.assigned_to.some(id => id.toString() === reqUser._id.toString())) {
            return NextResponse.json({
                message: "You are not authorised by superuser to modify this job"
            }, { status: 403 });
        }

        const form = await req.formData();
        const body = form && Object.fromEntries(form.entries());
        const { batch, courses, cgpa } = body;

        // Update eligibility criteria
        job.eligibility_criteria = {
            batch: batch ? (Array.isArray(batch) ? batch : [batch]) : job.eligibility_criteria.batch, 
            courses: courses ? JSON.parse(courses) : job.eligibility_criteria.courses,
            cgpa: cgpa ? parseFloat(cgpa) : job.eligibility_criteria.cgpa,
        }
        await job.save();

        return NextResponse.json({
            message: "Eligibility criteria updated successfully",
            data: job,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: error.message || "Internal Server Error",
            error: "An unexpected error occurred",
        }, {
            status: 500,
        });
    }
}
);

export const dynamic = "force-dynamic"; // Ensure this route is always fresh