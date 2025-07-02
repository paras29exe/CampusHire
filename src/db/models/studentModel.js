// const requiredFields = ["name", "rollno", "email", college_email, "phone", "course", "branch", "batch", "backlogs", "10th_percentage", "12th_percentage", "graduation_percentage"];

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: "student", 
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    college_email: {
        type: String, // e.g., "    
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    course: {
        type: String, // e.g., "B.Tech", "MCA"
        required: true
    },
    branch: {
        type: String, // e.g., "CSE", "AIDS"
        required: true
    },
    batch: {
        type: String, // e.g., "2025", "2026"
        required: true
    },
    backlogs: {
        type: Number, // Number of backlogs
        default: 0
    },
    tenth_percentage: {
        type: Number, // Percentage in 10th grade
        required: true
    },
    twelfth_percentage: {
        type: Number, // Percentage in 12th grade
        required: true
    },
    graduation_percentage: {
        type: Number, // Percentage in graduation (if applicable)
        default: null
    }
}, {
    timestamps: true,
})

export const Student = mongoose.model("students", studentSchema);
