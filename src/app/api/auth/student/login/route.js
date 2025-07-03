import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Student from '@/db/models/studentModel.js';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';

export async function POST(req) {
  await dbConnect();

  const { identifier, password } = await req.json();

  if (!identifier || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    // Find student by roll number OR username
    const student = await Student.findOne({
      $or: [{ rollno: identifier }, { username: identifier }]
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create JWT with student ID + role
    const token = signToken({
      id: student._id.toString(),
      role: 'student',
      username: student.username
    });

    const response = NextResponse.json({ message: 'Login successful' });

    // Set JWT in secure cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
