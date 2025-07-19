'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Assignment } from '@/db/models/assignmentsModel';


export const GET = withDB(async (req) => {
    const user = JSON.parse(req.headers.get('user'));
    const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
    const type = req.nextUrl.searchParams.get('type');
    const limit = 50; // Number of assignments per page
    const skip = (page - 1) * limit;

    if(user.role !== 'admin' && user.role !== 'superuser') {
        return NextResponse.json({ message: 'Only admins and Superusers can Access this data.' }, { status: 403 });
    }
    if (!type || !['active', 'completed'].includes(type)) {
        return NextResponse.json({ message: 'Invalid or missing "type" parameter for the assignment' }, { status: 400 });
    }

    try {
        const query = {  };

        if (type === 'active') {
            query.status = { $in: ['pending', 'in-progress'] }
        }else {
            query.status = 'completed';
        }

        if (user.role === 'admin') {
            query.assigned_to = user._id; // Fetch assignment drives to the admin
        } 
        
        // Fetch assignments with pagination
        const assignments = await Assignment.find(query)
            .sort({ createdAt: -1 }) // Sort by creation date, most recent first
            .skip(skip)
            .limit(limit)
            .populate('assigned_to', ) 
            .populate('assigned_by') 
            .populate('company', 'company _id');

        // Count total assignments for pagination metadata
        const totalAssignments = await Assignment.countDocuments(query);

        return NextResponse.json({
            message: "Assignments fetched successfully",
            data: assignments,
            pagination: {
                totalAssignments,
                currentPage: page,
                totalPages: Math.ceil(totalAssignments / limit),
            },
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || "Unexpected error occurred",
        }, { status: 500 });
    }
});
