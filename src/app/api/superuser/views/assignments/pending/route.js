import { Assignment } from "@/db/models/assignmentsModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    try {
        // Fetch pending assignments
        let page = req.nextUrl.searchParams.get("page") || 1;
        let limit = req.nextUrl.searchParams.get("limit") || 50;
        page = parseInt(page);
        limit = parseInt(limit);

        const data = await Assignment.find({ status: "pending" })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("company", "company")
            .populate("assigned_to", "name email phone")
            .populate("assigned_by", "name email phone");

        const grouped = {};

        // group assignments by jobId/same company
        // each jobId will have a list of assigned_to admins
        data.forEach((assignment) => {
            const jobId = assignment.company._id.toString();

            if (!grouped[jobId]) {
                grouped[jobId] = {
                    company: assignment.company.company, // contains name + website
                    assigned_by: assignment.assigned_by,
                    assigned_to: []
                };
            }
            grouped[jobId].assigned_to.push(assignment.assigned_to);
        })

        const assignments = Object.values(grouped);


        if (!assignments || assignments.length === 0) {
            return NextResponse.json(
                { message: "No pending assignments found." },
                { status: 404 }
            );
        }

        // Total number of assignments
        const totalAssignments = await Assignment.countDocuments({ status: "pending" });
        return NextResponse.json({
            data: assignments,
            pagination: {
                totalAssignments,
                currentPage: page,
                totalPages: Math.ceil(totalAssignments / limit),
            },
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching pending assignments:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
});

export const dynamic = "force-dynamic";