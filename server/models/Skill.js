const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Languages', 'Frontend', 'Libraries', 'Backend', 'Databases', 'Testing & Tools']
    },
    icon: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', SkillSchema);
