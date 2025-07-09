import { Assignment } from "@/db/models/assignmentsModel";
import { withDB } from "@/utils/server/dbHandler";  
import { NextResponse } from "next/server";

export const GET = withDB(async (req) => {
    try {
        const { page = 1, limit = 20 } = req.nextUrl.searchParams;
        const reqUser = JSON.parse(req.headers.get("user"));

        const data = await Assignment.find({ status: "pending" , assigned_to: reqUser._id })
            .sort({ createdAt: -1 }) // Sort by creation date in descending order
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate("jobId", "company")
            .populate("assigned_by", "name email phone")

        if(!data || data.length === 0) {
            return NextResponse.json(
                { message: "No pending assignments found." },
                { status: 404 }
            );
        }

        const totalAssignments = await Assignment.countDocuments({ status: "pending", assigned_to: reqUser._id });

        return NextResponse.json({
            message: "Pending assignments fetched successfully",
            data,
            pagination: {
                totalAssignments,
                currentPage: page,
                totalPages: Math.ceil(totalAssignments / limit),
            },
        }, { status: 200 });        
    } catch (err) {
        return NextResponse.json(
            { message: err.message || "Unexpected error occurred", error: "An error occurred while fetching pending assignments" },
            { status: 500 }
        );
    }
});
