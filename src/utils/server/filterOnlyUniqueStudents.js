'use server';

import { Student } from "@/db/models/studentModel";
import { withDB } from "@/utils/server/dbHandler";
import { generatePassword } from "@/utils/server/generatePassword";

export const filterOnlyUniqueStudents = withDB(async (formattedData) => {

        // Extract relevant fields from uploaded data
        const rollnos = formattedData.map(s => s.rollno);
        const emails = formattedData.map(s => s.email);
        const collegeEmails = formattedData.map(s => s.college_email);
        const phones = formattedData.map(s => s.phone);

        // Fetch only existing students that might conflict
        const existingStudents = await Student.find({
            $or: [
                { rollno: { $in: rollnos } },
                { email: { $in: emails } },
                { college_email: { $in: collegeEmails } },
                { phone: { $in: phones } }
            ]
        }, "rollno email college_email phone");

        // Build sets for fast lookup
        const rollnoSet = new Set(existingStudents.map(s => s.rollno));
        const emailSet = new Set(existingStudents.map(s => s.email));
        const collegeEmailSet = new Set(existingStudents.map(s => s.college_email));
        const phoneSet = new Set(existingStudents.map(s => s.phone));

        // Filter and enrich with password
        const newStudents = formattedData.filter(student =>
            !rollnoSet.has(student.rollno) &&
            !emailSet.has(student.email) &&
            !collegeEmailSet.has(student.college_email) &&
            !phoneSet.has(student.phone)
        ).map(student => ({
            ...student,
            password: generatePassword()
        }));

        return newStudents;
})