import { Job } from "@/db/models/jobModel";
import { withDB } from "@/utils/server/dbHandler";
import { extractRollNumbersFromExcel } from "@/utils/server/extractCandidates";
import { NextResponse } from "next/server";
export const POST = withDB(async (req, { params }) => {
    try {
        const { jobId } = params;
        const roleId = req.nextUrl.searchParams.get("roleId");

        if (!jobId || !roleId) {
            return NextResponse.json({ message: "Job ID and Role ID are required" }, { status: 400 });
        }

        // check if jobId is a valid ObjectId
        if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(roleId)) {
            return NextResponse.json({ message: "Invalid Job ID or Role ID format" }, { status: 400 });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return NextResponse.json({ message: "company not found" }, { status: 404 });
        }

        // Check if the user is authorized to modify the job
        const reqUser = req.headers.get("user");
        if (!job.assigned_to.some(id => id.toString() === reqUser._id.toString())) {
            return NextResponse.json({
                message: "You are not authorised by superuser to modify this job"
            }, { status: 403 });
        }

        // check if role exists
        const role = job.roles.find(r => r._id.toString() === roleId);
        if (!role) {
            return NextResponse.json({ message: "Role not found" }, { status: 404 });
        }

        const form = await req.formData();

        const round_details = form.get("round_details"); // object containing round details

        if (round_details) {
            const parsedRound = JSON.parse(round_details);

            const requiredFields = ['name', 'type', 'date', 'time'];
            const missingFields = requiredFields.filter(field => !parsedRound?.[field]);

            const isTypeValid = ['online', 'offline'].includes(parsedRound?.type);

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
        const shortlisted_candidates = extractRollNumbersFromExcel(shortlisted_file);

        role.shortlisted_candidates = shortlisted_candidates ? JSON.parse(shortlisted_candidates) : role.shortlisted_candidates;
        
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
