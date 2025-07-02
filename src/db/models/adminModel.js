import mongoose from 'mongoose';

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

export const Admin = mongoose.model("Admin", adminSchema);