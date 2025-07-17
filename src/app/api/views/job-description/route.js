'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Job } from '@/db/models/jobModel';

export const GET = withDB(async (req) => {
    try {
        const jobId = req.nextUrl.searchParams.get('jobId');

        const job = await Job.findById(jobId).populate('assigned_to');

        if (!job) {
            return NextResponse.json({
                error: 'Job not found',
                message: 'The job you are looking for does not exist.',
            }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Job description fetched successfully',
            data: job,
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            message: err.message || 'Unexpected error occurred',
            error: err.error || 'An error occurred while fetching the job description',
        }, { status: err.status || 500 });
    }
});
