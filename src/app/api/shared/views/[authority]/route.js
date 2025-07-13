'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Teacher } from '@/db/models/teacherModel';
import { Admin } from '@/db/models/adminModel';

export const GET = withDB(async (req, { params }) => {
    try {
        const paramsObj = await params;
        // students-data, teachers-data, admin-data
        const authority = paramsObj.authority?.toLowerCase().split('s-')?.[0] || null;
        const page = parseInt(req.nextUrl.searchParams.get('page')) || 1;
        const search = req.nextUrl.searchParams.get('search') || '';

        if (!authority) {
            return NextResponse.json({ message: 'Authority type is required' }, { status: 400 });
        }

        if (authority === 'superuser') {
            return NextResponse.json({ message: 'Superuser data is not supported here for this endpoint' }, { status: 400 });
        }

        const modelMap = {
            teacher: Teacher,
            admin: Admin
        };

        const Model = modelMap[authority];

        if (!Model) {
            return NextResponse.json({ message: 'Invalid authority type' }, { status: 400 });
        }


        const limit = 200; // Number of records per page
        const skip = (page - 1) * limit;

        const searchRegex = search ? new RegExp(search, 'i') : null;
        const query = {};
        if (searchRegex) {
            query.$or = [
                { employee_id: searchRegex },
                { name: searchRegex },
                { email: searchRegex },
            ];
        }

        const data = await Model.find(query)
            .sort({ name: 1, department: 1 }) // Sort by name in ascending order
            .skip(skip)
            .limit(limit)
            .select('-password -__v');

        const totalRecords = await Model.countDocuments(query);

        return NextResponse.json({
            message: `${authority} data fetched successfully`,
            data,
            pagination: {
                totalRecords,
                currentPage: page,
                totalPages: Math.ceil(totalRecords / limit),
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || 'Failed to fetch data',
            error: 'Unexpected Error: ' + error.name
        }, { status: 500 });
    }
});