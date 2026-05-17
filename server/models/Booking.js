const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  projectName: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true
  },
  projectDetails: {
    type: String,
    required: [true, 'Please describe your project']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please select a preferred start date']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  aiEstimate: {
    estimatedCost: String,
    breakdown: String,
    timeline: String,
    generatedAt: Date
  },
  totalPrice: {
    type: Number
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);