const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  city: { type: String, default: '' },
  district: { type: String, default: '' },
  password: { type: String, required: true }, // for auth
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
