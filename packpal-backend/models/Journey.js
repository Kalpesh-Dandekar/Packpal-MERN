const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripName: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelers: { type: Number, default: 1 },
  specialRequests: { type: String },
  tripType: { type: String, default: 'leisure' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Journey', journeySchema);
