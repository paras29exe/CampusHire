import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
        required: true
    },
    // array of admins assigned to this job
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
        enum: ['assigned', 'in_progress', 'completed'],
        default: 'assigned'
    }
}, {
    timestamps: true
})

export const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);