const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripName: String,
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelers: { type: Number, default: 1 },
  tripType: { type: String, required: true },
  packageType: { type: String, required: true },
  specialRequests: String,
  totalCost: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
