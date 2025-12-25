import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

const adminSchema = new mongoose.Schema({
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
        select: false, // Exclude password from query results by default
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    assigned_companies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignments',
    }],
}, {
    timestamps: true,
});

// Encrypt password before saving
adminSchema.pre("save", async function () {
    if (this.isModified("password")) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// Method to compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(candidatePassword.trim(), this.password);
}

adminSchema.methods.generateAuthToken = async function () {
    // Generate a JWT token for the admin
    const token = await new SignJWT({ _id: this._id.toString(), role: this.role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.TOKEN_EXPIRY) // Token valid for 1 hour
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    return token;
}

export const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);