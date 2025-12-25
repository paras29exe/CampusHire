import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

const superUserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
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
        default: "superuser",
    }
}, {
    timestamps: true,
})

// Encrypt password before saving
superUserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        // Hash the password before saving
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// Method to compare password
superUserSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(candidatePassword.trim(), this.password);
}

// Method to generate JWT token
superUserSchema.methods.generateAuthToken = async function () {
    // Generate a JWT token for the superuser
    const token = await new SignJWT({ _id: this._id.toString(), role: this.role, name: this.username })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.TOKEN_EXPIRY || '3d') // Token valid for 3 days
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    return token;
}

export const SuperUser = mongoose.models.superusers || mongoose.model("superusers", superUserSchema);