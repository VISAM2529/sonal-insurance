import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  heroImage: {
    type: String,
    required: false,
    default: ''
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  keyFeatures: [{
    type: String,
    required: true
  }],
  benefits: [{
    title: String,
    description: String,
    icon: String
  }],
  eligibility: [{
    type: String
  }],
  documents: [{
    name: String,
    description: String,
    required: Boolean
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  stats: [{
    label: String,
    value: String,
    growth: String
  }],
  processSteps: [{
    step: Number,
    title: String,
    description: String,
    icon: String
  }],
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
  },
  metaTitle: String,
  metaDescription: String,
  tags: [String]
}, {
  timestamps: true
});

serviceSchema.index({ categoryId: 1, isActive: 1 });
serviceSchema.index({ slug: 1 });
delete mongoose.models.Service;
export default mongoose.models.Service || mongoose.model('Service', serviceSchema);