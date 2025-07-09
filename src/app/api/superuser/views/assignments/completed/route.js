'use server'

import { Assignment } from "@/db/models/assignmentsModel";
import { withDB } from "@/utils/server/dbHandler";
import { NextResponse } from "next/server"; 

export const GET = withDB(async (req) => {
    try {
        // Fetch completed assignments
        let page = req.nextUrl.searchParams.get("page") || 1;
        let limit = req.nextUrl.searchParams.get("limit") || 50;
        page = parseInt(page);
        limit = parseInt(limit);

        const data = await Assignment.find({ status: "completed" })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("company", "company")
            .populate("assigned_to", "name email phone")
            .populate("assigned_by", "name email phone");

        const grouped = {};

        // Group assignments by jobId/same company
        // Each jobId will have a list of assigned_to admins
        data.forEach((assignment) => {
            const jobId = assignment.company._id.toString();

            if (!grouped[jobId]) {
                grouped[jobId] = {
                    company: assignment.company.company, // Contains name + website
                    assigned_by: assignment.assigned_by,
                    assigned_to: []
                };
            }
            grouped[jobId].assigned_to.push(assignment.assigned_to);
        });

        const assignments = Object.values(grouped);

        if ((!assignments || assignments.length === 0) && page === 1) {
            return NextResponse.json(
                { message: "No completed assignments found." },
                { status: 404 }
            );
        }

        // Total number of assignments
        const totalAssignments = await Assignment.countDocuments({ status: "completed" });
        
        return NextResponse.json({
            data: assignments,
            pagination: {
                totalAssignments,
                currentPage: page,
                totalPages: Math.ceil(totalAssignments / limit),
            },
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || "Unexpected error occurred",
            error: "An error occurred while fetching completed assignments"
        },  { status: 500 }
        );
    }
}
);

export const dynamic = "force-dynamic";