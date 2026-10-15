const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    longDescription: {
      type: String,
      required: true
    },
    problemSolved: {
      type: String,
      default: ''
    },
    technologies: {
      type: [String],
      required: true,
      default: []
    },
    features: {
      type: [String],
      required: true,
      default: []
    },
    image: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      required: true,
      default: 'https://github.com/Anji0522'
    },
    liveUrl: {
      type: String,
      default: null
    },
    featured: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      enum: ['Full-Stack', 'Frontend', 'Backend', 'Other'],
      default: 'Frontend'
    },
    frontendArchitecture: {
      type: String,
      default: ''
    },
    backendArchitecture: {
      type: String,
      default: ''
    },
    apis: {
      type: [String],
      default: []
    },
    authentication: {
      type: String,
      default: ''
    },
    database: {
      type: String,
      default: ''
    },
    deployment: {
      type: String,
      default: ''
    },
    challenges: {
      type: String,
      default: ''
    },
    whatILearned: {
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

module.exports = mongoose.model('Project', ProjectSchema);
