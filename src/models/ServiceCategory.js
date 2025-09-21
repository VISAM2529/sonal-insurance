import mongoose from 'mongoose';

const serviceCategorySchema = new mongoose.Schema({
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
  bgGradient: {
    type: String,
    default: 'from-blue-50 to-blue-100'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  image:{
    type: String,
    default: ''
  }
}, {
  timestamps: true
});
delete mongoose.models.ServiceCategory;
export default mongoose.models.ServiceCategory || mongoose.model('ServiceCategory', serviceCategorySchema);
