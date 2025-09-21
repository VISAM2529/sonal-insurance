import mongoose from 'mongoose';

const loanStatsSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true // e.g., "2024-01"
  },
  year: {
    type: Number,
    required: true
  },
  monthName: {
    type: String,
    required: true // e.g., "Jan"
  },
  totalApplications: {
    type: Number,
    default: 0
  },
  approvedApplications: {
    type: Number,
    default: 0
  },
  disbursedAmount: {
    type: Number,
    default: 0 // in rupees
  },
  approvedAmount: {
    type: Number,
    default: 0 // in rupees
  },
  averageProcessingTime: {
    type: Number,
    default: 0 // in hours
  },
  categoryWiseStats: [{
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LoanCategory'
    },
    applications: Number,
    approved: Number,
    disbursed: Number
  }]
}, {
  timestamps: true
});
loanStatsSchema.index({ month: 1, year: 1 }, { unique: true });

export default mongoose.models.LoanStats || mongoose.model('LoanStats', loanStatsSchema);
