const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      required: true,
      trim: true
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      default: 'Mancherial, Telangana'
    },
    year: {
      type: String,
      required: true
    },
    score: {
      type: String,
      required: true
    },
    details: {
      type: [String],
      default: []
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', EducationSchema);
