'use server';
import * as XLSX from "xlsx";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

export const sendCredentialsToTeacher = async (email, studentsData) => {
    try {
        // Pick required fields only
        const students = studentsData.map(student => ({
            roll_number: student.roll_number,
            name: student.name,
            email: student.email,
            password: student.password
        }));

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(students);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Credentials");

        // Generate a buffer
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        // Send email
        await transporter.sendMail({
            from: '"CampusHire Portal" <paras.webdev404@gmail.com>',
            to: email,
            subject: `Credentials for Newly Added ${studentsData[0].course + (studentsData[0].branch ? ("-" + studentsData[0].branch) : "" )} Students`,
            text: "Check the attached file for the credentials of newly added students. ",
            attachments: [
                {
                    filename: "students_credentials.xlsx",
                    content: buffer,
                    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }
            ]
        }, (err, info) => {
            if (err) {
                throw new Error("Failed to send email");
            }
            console.log("Email sent successfully:", info.response);
        });

        return true; // Email sent successfully

    } catch (error) {
        throw error; // Signal failure (no NextResponse in utility)
    }
}
