'use server';

import { NextResponse } from 'next/server';
import { withDB } from '@/utils/server/dbHandler';
import { Student } from '@/db/models/studentModel';
import { SuperUser } from '@/db/models/superUserModel';
import { Teacher } from '@/db/models/teacherModel';
import { Admin } from '@/db/models/adminModel';
import mongoose from 'mongoose';

export const GET = withDB(async (req) => {
    const role = req.nextUrl.searchParams.get('role');
    const userId = req.nextUrl.searchParams.get('uid');

    if (!role || !userId) {
        return NextResponse.json({ message: 'Role and User ID are required' }, { status: 400 });
    }
    
    if(!mongoose.isValidObjectId(userId)) {
        return NextResponse.json({ message: 'Invalid User ID format' }, { status: 400 });
    }

    const modelMap = {
        student: Student,
        superuser: SuperUser,
        teacher: Teacher,
        admin: Admin
    };
    const Model = modelMap[role.toLowerCase()];

    if (!Model) {
        return NextResponse.json({ message: 'Invalid user role' }, { status: 400 });
    }
    try {
        const userData = await Model.findById(userId).select('-password -__v');
        
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