const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    organization: {
      type: String,
      required: true,
      default: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)'
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    certificateUrl: {
      type: String,
      default: null
    },
    credentialId: {
      type: String,
      default: ''
    },
    skillsCovered: {
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

module.exports = mongoose.model('Certification', CertificationSchema);
