import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const teacherSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false, 
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

// Encrypt password before saving
teacherSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
teacherSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(candidatePassword.trim(), this.password);
}

teacherSchema.methods.generateAuthToken = function () {
    // Generate a JWT token for the teacher
    const token = jwt.sign(
        { _id: this._id, role: this.role, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY || '3d' }
    );
    return token;
};

export const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);