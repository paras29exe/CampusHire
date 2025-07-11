'use server';
import { jwtVerify } from "jose";
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
    const { pathname } = req.nextUrl;
    const validRoles = ['admin', 'student', 'teacher', 'superuser'];

    // Skip all `/api/auth` paths
    if (pathname.endsWith('/login')) {
        return NextResponse.next();
    }

    const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
        return NextResponse.json({ message: 'No access token found' }, { status: 404 });
    }

    try {
        const reqRole = pathname.split('api/')[1]?.split('/')[0];
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const response = await jwtVerify(token, secret);
        const decoded = response.payload;

        // student role cannot access shared APIs
        if (decoded && decoded._id && (decoded.role === 'student' && pathname.startsWith('/api/shared'))) {
            return NextResponse.json({ message: 'Unauthorized to access this feature' }, { status: 403 });
        }

        // all the roles can acess the views API
        if (pathname.startsWith('/api/views')) {
            // just to ensure the user is logged in and skip the role check
        }
        else if (decoded.role !== reqRole && !pathname.startsWith('/api/shared') && !pathname.startsWith('/api/auth')) {
            return NextResponse.json({ message: 'Unauthorized to access this feature' }, { status: 403 });
        }

        // If the token is valid, you can proceed with the request
        const res = NextResponse.next();
        res.headers.set('user', JSON.stringify(decoded));

        return res;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return NextResponse.json({ message: 'Access-Token expired. Login again' }, { status: 401 });
        }
        return NextResponse.json({
            message: error.message,
            error: "Unexpected Error: Token verification failed"
        }, { status: 500 });
    }
}

export const config = {
    matcher: [
        '/api/:path*', // Protects all subpaths under /api/auth/admin
    ]
};
