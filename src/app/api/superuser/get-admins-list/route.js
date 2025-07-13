'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Admin } from '@/db/models/adminModel';

export const GET = withDB(async (req) => {
    // just simply give all the admins without any pagination or search or checks
    try {
        const admins = await Admin.find({})
            .sort({ name: 1 }) // Sort by name in ascending order
            .limit(200) // Limit to 100 admins
            .select('+name +email +_id'); // Exclude password and __v field

        return NextResponse.json({
            message: 'Admins list fetched successfully',
            data: admins,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || 'An error occurred while fetching the admins list',
        }, { status: 500 });
    }
});