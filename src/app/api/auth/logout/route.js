'use server';

import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Clear the session or token here
        // This is a placeholder, actual implementation may vary
        // For example, you might clear cookies or invalidate a session token
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        };

        const res = NextResponse.json({ message: "Logout successful", user: {}, role: undefined }, { status: 200 });
        res.cookies.set('accessToken', '', cookieOptions);

        return res;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}