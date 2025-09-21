import mongoose from 'mongoose';

const servicePlanSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  coverage: {
    type: String,
    required: true
  },
  premium: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.ServicePlan || mongoose.model('ServicePlan', servicePlanSchema);
