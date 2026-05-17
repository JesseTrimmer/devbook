const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a service title'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Website Design & Development',
      'Mobile App Development',
      'E-Commerce Store',
      'Landing Page',
      'Website Redesign & Maintenance'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  duration: {
    type: String,
    required: true
  },
  startingPrice: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);