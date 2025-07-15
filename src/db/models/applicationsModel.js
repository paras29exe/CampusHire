import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true
  },
  applicantRollNumber: {
    type: String,
    required: true,
    trim: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobs',
    required: true
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId, // from job.job_roles[x]._id
    required: true
  },
  round_number: {
    type: Number,
    required: true,
    default: 0 // Default to first round
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'selected'],
    default: 'applied'
  }
}, { timestamps: true });

export const Application = mongoose.models.applications || mongoose.model('applications', applicationSchema);
