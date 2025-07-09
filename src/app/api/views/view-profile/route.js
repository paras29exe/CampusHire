'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Student } from '@/db/models/studentModel';
import { SuperUser } from '@/db/models/superUserModel';
import { Teacher } from '@/db/models/teacherModel';
import { Admin } from '@/db/models/adminModel';

export const GET = withDB(async (req) => {
    const user = JSON.parse(req.headers.get('user'));

    const modelMap = {
        student: Student,
        superuser: SuperUser,
        teacher: Teacher,
        admin: Admin
    }

    const Model = modelMap[user.role.toLowerCase()];

    if (!Model) {
        return NextResponse.json({ message: 'Invalid user role' }, { status: 400 });
    }
    try {
        const userData = await Model.findById(user._id).select('-password -__v');
        
        if (!userData) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'User profile fetched successfully',
            user: userData
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: error.message || 'Failed to fetch user profile',
            error: 'Unexpected Error: ' + error.name
         }, { status: 500 });
    }
});

export const dynamic = 'force-dynamic'; // Ensures the route is always fresh
export const revalidate = 0; // Disables static caching for this route