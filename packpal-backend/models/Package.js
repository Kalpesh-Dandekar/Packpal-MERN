const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Use same names as Trip schema for consistency
  tripName: { type: String, default: 'Unnamed Trip' }, // optional, but useful
  location: { type: String, required: true },
  tier: { type: String, required: true }, // e.g. Basic, Deluxe, Premium
  price: { type: Number, required: true }, // total cost of trip
  duration: { type: String, required: true }, // e.g. "2025-08-01 to 2025-08-05"
  travelers: { type: Number, required: true }, // number of travelers
  tripType: { type: String, required: true }, // Leisure, Adventure, etc.
  specialRequests: { type: String, default: '' }, // optional

}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
