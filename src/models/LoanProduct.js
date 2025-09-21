import mongoose from 'mongoose';

const loanProductSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoanCategory',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image:{
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  interestRate: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    display: {
      type: String,
      required: true // e.g., "8.50%"
    }
  },
  loanAmount: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    display: {
      type: String,
      required: true // e.g., "₹5 Cr"
    }
  },
  tenure: {
    min: {
      type: Number,
      required: true // in years
    },
    max: {
      type: Number,
      required: true // in years
    },
    display: {
      type: String,
      required: true // e.g., "30 years"
    }
  },
  features: [{
    type: String,
    required: true
  }],
  eligibility: [{
    type: String
  }],
  documents: [{
    name: String,
    description: String,
    required: Boolean
  }],
  benefits: [{
    title: String,
    description: String,
    icon: String
  }],
  processSteps: [{
    step: Number,
    title: String,
    description: String,
    icon: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  processingFee: {
    type: String,
    default: "As per bank norms"
  },
  prepaymentCharges: {
    type: String,
    default: "Nil"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add indexes
loanProductSchema.index({ categoryId: 1, isActive: 1 });
delete mongoose.models.LoanProduct;
export default mongoose.models.LoanProduct || mongoose.model('LoanProduct', loanProductSchema);
