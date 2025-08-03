const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripName: { type: String, default: 'Unnamed Trip' },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelers: { type: Number, required: true, default: 1 },
  tripType: { type: String, required: true },
  packageType: { type: String, required: true },
  specialRequests: { type: String, default: '' },
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
  isFavorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
