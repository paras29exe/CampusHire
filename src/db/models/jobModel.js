import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company: {
        name: { type: String, required: true },
        website: { type: String }
    },

    eligibility_criteria: {
        batch: { type: [String] , default: [] }, // e.g., ["2025", "2026"]
        // to be entered by admin
        courses: {
            type: Map,
            of: [String] || null, // e.g., { "B.Tech": ["CSE", "AIDS"], "MCA": null }
            default: {}
        },
        cgpa: { type: Number, default: 0 } // minimum CGPA required
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
                name: { type: String }, // e.g., "Technical Interview", "HR Round"
                type: { type: String, enum: ['online', 'offline'] }, // e.g., "online", "offline"
                date: { type: Date,  }, // date of the round
                time: { type: String }, // time of the round in HH:MM format
                duration: { type: String }, // duration of the round in minutes
                link: { type: String }, // link for online rounds, can be null for offline rounds
                default: {},
            },
            shortlisted_candidates: {
                type: [String], // array of roll numbers
                default: ["all"] // default to all candidates,
            }

        }
    ],

    job_details: {
        job_location: { type: String },
        shift_timing: { type: String },
        date_of_joining: { type: String },
        placement_process: { type: [String] },
    },

    // done by superuser
    assigned_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        // required: true
    }],

    // manual details to enter by admin
    links: {
        company_link: { type: String },
        college_link: { type: String },
    },
    last_date_to_apply: { type: Date },
    status: {
        type: String,
        enum: ['active', 'unPublished', 'expired', "unAssigned"],
        default: 'unAssigned' 
    },

}, { timestamps: true });

export const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);
