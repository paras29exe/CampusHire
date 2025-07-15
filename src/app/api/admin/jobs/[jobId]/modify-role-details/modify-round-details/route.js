'use server';

import { Application } from "@/db/models/applicationsModel";
import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { extractRollNumbersFromExcel } from "@/utils/server/extractShortlistedCandidates";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = withDB(async (req, { params }) => {
    try {
        const { jobId } = await params;
        const roleId = req.nextUrl.searchParams.get("roleId");

        if (!jobId || !roleId) {
            return NextResponse.json({ message: "Job ID and Role ID are required" }, { status: 400 });
        }

        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ message: "Invalid Job ID " }, { status: 400 });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return NextResponse.json({ message: "company not found" }, { status: 404 });
        }

        // Check if the user is authorized to modify the job
        const reqUser = JSON.parse(req.headers.get("user"));
        if (!job.assigned_to.some(id => id.toString() === reqUser._id.toString())) {
            return NextResponse.json({
                message: "You are not authorised by superuser to modify this job"
            }, { status: 403 });
        }

        // check if role exists
        const role = job.job_roles.find(r => r._id.toString() === roleId);
        if (!role) {
            return NextResponse.json({ message: "Role not found" }, { status: 404 });
        }

        const form = await req.formData()
        let round_details = await form.get("round_details"); // object containing round details

        if (typeof round_details !== "string") {
            round_details = await round_details.text()
        }

        let round_number = 1;

        if (round_details) {
            const parsedRound = JSON.parse(round_details);
            round_number = parseInt(parsedRound.round_number) || 1; // Default to 1 if not provided

            const requiredFields = ['name', 'type', 'date'];
            const missingFields = requiredFields.filter(field => !parsedRound?.[field]);

            const isTypeValid = ['online', 'offline'].includes(parsedRound?.type.toLowerCase());

            if (missingFields.length > 0 || !isTypeValid) {
                return NextResponse.json({
                    message: `Invalid round_details. Missing fields: ${missingFields.join(', ') || 'None'}, or invalid type.`,
                }, { status: 400 });
            }

            // Convert date string to Date object if needed
            parsedRound.date = new Date(parsedRound.date);

            // All good, assign it
            role.round_details = parsedRound;
        }

        const shortlisted_file = form.get("shortlisted_candidates");
        const allStudents = JSON.parse(form.get("select_all"))

        if (!shortlisted_file && !allStudents) {
            return NextResponse.json({ message: "Either shortlisted_candidates file or all_students flag must be provided" }, { status: 400 });
        }
        if (shortlisted_file && allStudents) {
            return NextResponse.json({ message: "You cannot provide both shortlisted_candidates file and all_students flag" }, { status: 400 });
        }

        if (!allStudents) {
            const shortlisted_candidates = await extractRollNumbersFromExcel(shortlisted_file);
            console.log("Shortlisted candidates:", shortlisted_candidates);
            await Application.updateMany(
                {
                    roleId: roleId,
                    jobId: jobId,
                    applicantRollNumber: { $in: shortlisted_candidates },
                },
                {
                    // store which round number the candidate is shortlisted for
                    $set: { status: "shortlisted", round_number: round_number }
                }
            );
            await Application.updateMany(
                {
                    roleId: roleId,
                    jobId: jobId,
                    applicantRollNumber: { $nin: shortlisted_candidates },
                },
                {
                    // update status to rejected for those not shortlisted
                    $set: { status: "rejected" }
                }
            );
            role.shortlisted_candidates = ['Updated in Applications collection']; // Placeholder, as we don't store shortlisted candidates in the role directly
        } 
        else if (allStudents && round_number !== 1) {
            // If all students are selected, we update the status of all applications for this role
            await Application.updateMany(
                {
                    roleId: roleId,
                    jobId: jobId,
                    status: { $ne: "rejected" } // Only update those not already rejected
                },
                {
                    $set: { status: "shortlisted", round_number: round_number }
                }
            );
            role.shortlisted_candidates = ['All students selected from previous round']; // Placeholder, as we don't store shortlisted candidates in the role directly
        }

        await job.save();

        return NextResponse.json({
            message: "Role details updated successfully",
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
}); 