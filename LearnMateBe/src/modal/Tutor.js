const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: String,
  issuedBy: String,
  year: Number,
}, { _id: false });

const timeSlotSchema = new mongoose.Schema({
  day: String,
  slots: [String],
}, { _id: false });

const tutorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  subjects: [String],
  classes: [Number],
  pricePerHour: Number,
  experience: String,
  education: String,
  location: String,
  rating: { type: Number, default: 0 },
  languages: [String],
  certifications: [certificationSchema],
  availableTimes: [timeSlotSchema],
  profileImage: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  isVerified: {
    type: Boolean,
    default: false
  },
  active: { type: Boolean, default: true },

}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);
