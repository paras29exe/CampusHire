'use server';
import { jwtVerify } from "jose";
import { NextResponse } from 'next/server';

export const middleware = async (req) => {
    const { pathname } = req.nextUrl;

    // Skip all `/api/auth` paths
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();         
    }

    const authHeader = req.cookies.get('accessToken') || req.headers.get('authorization');
    let token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'No access token found' }, { status: 404 });
    }

    try {
        const reqRole = pathname.split('api/')[1]?.split('/')[0];

        const response = await jwtVerify(token, process.env.JWT_SECRET);
        const decoded = response.payload;

        if (!decoded || decoded.role !== reqRole) {
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
            message: 'Invalid access token',
            error: error.message
        }, { status: 401 });
    }
}

export const config = {
    matcher: [
        '/api/:path*', // Protects all subpaths under /api/auth/admin
    ]
};
