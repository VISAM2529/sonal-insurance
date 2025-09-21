import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema({
  loanProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoanProduct',
    required: true
  },
  applicationNumber: {
    type: String,
    unique: true,
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: Date,
    panNumber: String,
    aadharNumber: String
  },
  loanDetails: {
    requestedAmount: { type: Number, required: true },
    tenure: { type: Number, required: true }, // in years
    purpose: String,
    monthlyIncome: Number,
    employmentType: {
      type: String,
      enum: ['salaried', 'self-employed', 'business', 'retired']
    }
  },
  addressDetails: {
    currentAddress: String,
    permanentAddress: String,
    city: String,
    state: String,
    pincode: String
  },
  documentsUploaded: [{
    documentType: String,
    fileName: String,
    filePath: String,
    uploadedAt: Date
  }],
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected', 'disbursed'],
    default: 'pending'
  },
  creditScore: Number,
  approvedAmount: Number,
  approvedRate: Number,
  approvedTenure: Number,
  remarks: String,
  assignedTo: String, // Employee ID or name
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-generate application number
loanApplicationSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const count = await mongoose.model('LoanApplication').countDocuments();
    this.applicationNumber = `LA${Date.now()}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.models.LoanApplication || mongoose.model('LoanApplication', loanApplicationSchema);
