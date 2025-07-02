import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
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
    role: {
        type: String,
        default: "teacher",
    },
    department: {
        type: String, // e.g., "Computer Science", "Mathematics"
        required: true
    },
}, {
    timestamps: true,
});

export const Teacher = mongoose.model("Teacher", TeacherSchema);