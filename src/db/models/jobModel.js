import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company: {
        name: { type: String, required: true },
        website: { type: String }
    },

    eligibility_criteria: {
        batch: { type: [String], required: true }, // e.g., ["2025", "2026"]
        // to be entered by admin
        courses: {
            type: Map,
            of: [String], // e.g., { "B.Tech": ["CSE", "AIDS"], "MCA": null }
        },
        cgpa: { type: String } // Keep as String to support "No criteria", "7+", etc.
    },

    job_roles: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true, unique: true },
            role: { type: String, required: true },
            skills_required: [String],
            responsibilities: [String],
            package_details: {
                internship_period: { type: String },
                stipend: { type: String },
                package: { type: String },
                conditions: { type: String }
            },

            // manually entered by admin
            round_details: {
                type: Map,
                of: String
            },
            shortlisted_candidates: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'students',
            },
        }
    ],


    job_details: {
        job_location: { type: String },
        shift_timings: { type: String },
        date_of_joining: { type: String },
        placement_process: { type: [String] }, 
    },

    // done by superuser
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        // required: true
    },

    // manual details to enter by admin
    links: {
        college_link: { type: String },
        company_link: { type: String },
    },
    last_date_to_apply: { type: Date },
    status: {
        type: String,
        enum: ['active', 'inactive', 'archived',],
        default: 'active'
    },

}, { timestamps: true });

export const Job = mongoose.model('jobs', JobSchema);
