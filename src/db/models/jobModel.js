import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company: {
        name: { type: String, required: true },
        website: { type: String }
    },

    eligibility_criteria: {
        batches: { type: [String] , default: [] }, // e.g., ["2025", "2026"]
        // to be entered by admin
        courses: {
            type: [String], // e.g., ["B.Tech-CSE", "M.Tech-AIML", "MBA"]
            default: []
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
                name: { type: String, default: "To be Updated" }, // e.g., "Technical Interview", "HR Round"
                type: { type: String, enum: ['online', 'offline'], default: "online" }, // e.g., "online", "offline"
                date: { type: Date, default: null}, // date of the round
                time: { type: String, default: null }, // time of the round in HH:MM format
                duration: { type: String, default: "No available" }, // duration of the round in minutes
                link: { type: String, default: "Not available" }, // link for online rounds, can be null for offline rounds
            },
            shortlisted_candidates: {
                type: [String], // array of roll numbers
                default: ["all"] // default to all candidates,
            }

        }
    ],

    job_details: {
        job_location: { type: String },
        package: { type: String }, // e.g., "₹12-18 LPA" or "Not Disclosed"
        shift_timing: { type: String },
        date_of_joining: { type: String },
        placement_process: { type: [String] },
    },

    // done by superuser
    assigned_to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        default: []
        // required: true
    }],

    // manual details to enter by admin
    links: {
        company_link: { type: String, default: "" },
        college_link: { type: String, default: "" },
    },
    drive_type: {
        type: String,
        enum: ['online', 'offline'],
        default: 'online' // default to online drive
    },
    last_date_to_apply: { type: Date, default: null }, // date when applications close
    status: {
        type: String,
        enum: ['active', 'unpublished', 'expired', "unassigned"],
        default: 'unassigned' 
    },

}, { timestamps: true });

export const Job = mongoose.models.jobs || mongoose.model("jobs", JobSchema);
