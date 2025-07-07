// const requiredFields = ["name", "rollno", "email", college_email, "phone", "course", "branch", "batch", "backlogs", "10th_percentage", "12th_percentage", "graduation_percentage"];

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

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
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, 
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
    },
    department: {
        type: String, 
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

// encrypt password
studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
studentSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(candidatePassword.trim(), this.password);
}

studentSchema.methods.generateAuthToken = async function () {
    // Generate a JWT token for the student
    
    const token = await new SignJWT({ _id: this._id.toString(), role: this.role, name: this.name })
        .setProtectedHeader({ alg: 'HS256' })   
        .setIssuedAt()
        .setExpirationTime(process.env.TOKEN_EXPIRY || '3d') // Token
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
    return token;
}

export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
