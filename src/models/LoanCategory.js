import mongoose from 'mongoose';

const loanCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue'
  },
  bgColor: {
    type: String,
    default: 'bg-blue-50'
  },
  iconBg: {
    type: String,
    default: 'bg-blue-100'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.LoanCategory || mongoose.model('LoanCategory', loanCategorySchema);
