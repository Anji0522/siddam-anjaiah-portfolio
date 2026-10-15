const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Siddam Anjaiah'
    },
    title: {
      type: String,
      required: true,
      default: 'React Frontend Developer | Full-Stack Developer'
    },
    subtitle: {
      type: String,
      default: 'Building responsive, accessible and user-focused web applications with React, JavaScript and modern full-stack technologies.'
    },
    summary: {
      type: String,
      required: true
    },
    objective: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      default: 'anjisiddam01@gmail.com'
    },
    phone: {
      type: String,
      required: true,
      default: '9390098364'
    },
    location: {
      type: String,
      required: true,
      default: 'Mancherial, Telangana, India'
    },
    github: {
      type: String,
      required: true,
      default: 'https://github.com/Anji0522'
    },
    linkedin: {
      type: String,
      required: true,
      default: 'https://www.linkedin.com/in/siddam-anjaiah/'
    },
    resumeUrl: {
      type: String,
      default: '/assets/Siddam_Anjaiah_React_Frontend_Resume_1Page.pdf'
    },
    profileImage: {
      type: String,
      default: '/assets/profile-image.jpeg'
    },
    targetRoles: {
      type: [String],
      default: ['React Developer', 'Frontend Developer', 'Full-Stack Developer', 'Junior Software Developer']
    },
    strengths: {
      type: [String],
      default: [
        'Problem Solving',
        'Continuous Learning',
        'React Development',
        'API Integration',
        'Responsive Design',
        'Debugging',
        'Real-World Application Development',
        'Adaptability',
        'UI Attention',
        'Full-Stack Development'
      ]
    },
    improvingAreas: {
      type: [String],
      default: [
        'Advanced backend architecture',
        'System design',
        'Advanced testing',
        'Cloud deployment',
        'Full-stack architecture',
        'Problem-solving speed'
      ]
    },
    interests: {
      type: [String],
      default: [
        'Web Development',
        'React Development',
        'UI/UX',
        'Full-Stack Development',
        'REST API Development',
        'Learning New Technologies',
        'Real-World Application Development',
        'GitHub',
        'Problem Solving'
      ]
    },
    stats: {
      apiApps: { type: String, default: '4+' },
      restApis: { type: String, default: '11' },
      projectsCount: { type: String, default: '5' },
      architecture: { type: String, default: 'MERN' }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
