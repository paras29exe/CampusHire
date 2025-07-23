'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Application } from '@/db/models/applicationsModel';
import mongoose from 'mongoose';
import { Job } from '@/db/models/jobModel';

export const GET = withDB(async (req) => {
    try {
        const jobId = req.nextUrl.searchParams.get('jobId');
        const studentId = JSON.parse(req.headers.get('user') || '{}')._id;

        if (!jobId) {
            return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
        }

        // Validate ObjectId format
        if (!mongoose.isValidObjectId(jobId)) {
            return NextResponse.json({ error: 'Invalid Job ID format' }, { status: 400 });
        }

        const applications = await Application.aggregate([
            {
                $match: {
                    jobId: new mongoose.Types.ObjectId(jobId),
                    applicant: new mongoose.Types.ObjectId(studentId)
                }
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    data: { $push: '$roleId' }
                }
            },
            {
                $project: {
                    status: '$_id',
                    count: '$count',
                    roles: '$data'
                }
            }
        ]);

        const job = await Job.findOne({
            _id: mongoose.Types.ObjectId.createFromHexString(jobId),
        }).populate('assigned_to');

        if (!job) {
            return NextResponse.json({ error: 'Job not found or is unpublished' }, { status: 404 });
        }

        const info = applications.reduce((acc, curr) => {
            acc[curr.status] = curr.count;
            return acc;
        }, {});

        // Create a map of roleId -> status
        const roleStatusMap = {};

        applications.forEach(appGroup => {
            appGroup.roles.forEach(roleId => {
                roleStatusMap[roleId.toString()] = appGroup.status; 
            });
        });

        const transformedRoles = job.job_roles.map(role => (
            {
                ...role.toObject(),
                status: roleStatusMap[role._id.toString()] || undefined
            }
        ))
        
        return NextResponse.json({
            message: 'Data fetched successfully',
            data: {
                ...job.toObject(),
                job_roles: transformedRoles
            },
            info: info
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || 'Unexpected error occurred',
            error: err.error || 'An error occurred while fetching the application status'
        }, { status: err.status || 500 });
    }
});