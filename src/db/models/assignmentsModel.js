import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
        required: true
    },
    // multiple admins can be assigned to a job
    assigned_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required: true
    }],
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'superusers',
        required: true
    },  
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
})

export const Assignment = mongoose.models.assignments || mongoose.model("assignments", assignmentSchema);