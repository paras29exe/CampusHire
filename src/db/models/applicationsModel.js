import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true
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
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'selected'],
    default: 'applied'
  }
}, { timestamps: true });

export const Application = mongoose.models.applications || mongoose.model('applications', applicationSchema);
