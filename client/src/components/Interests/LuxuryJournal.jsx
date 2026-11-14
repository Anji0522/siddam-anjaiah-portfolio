import React from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Code, Rocket, CheckCircle, ArrowRight } from 'lucide-react';
import './LuxuryJournal.css';

const journeyMilestones = [
  {
    phase: 'PHASE 01',
    year: '2021 – 2024',
    title: 'Computer Applications & Logic Foundations',
    subtitle: 'Vivekavardhini Degree College, Mancherial',
    description:
      'Completed B.Com in Computer Applications (CGPA: 6.23). Built strong fundamentals in algorithm design, procedural programming with Python, SQL relational databases, and commercial software fundamentals.',
    tag: 'Academic Milestone'
  },
  {
    phase: 'PHASE 02',
    year: '2024 – 2025',
    title: 'Modern Frontend & React.js Specialization',
    subtitle: 'NxtWave CCBP 4.0 Academy & Intensive Practice',
    description:
      'Earned verified certifications in Programming Foundations, Static Websites (HTML5/CSS3), Responsive Design (Flexbox, Bootstrap), and JavaScript Essentials. Built and battle-tested single-page applications including Book Hub and JobbyApp.',
    tag: 'Frontend Deep Dive'
  },
  {
    phase: 'PHASE 03',
    year: '2025 – 2026',
    title: 'Full-Stack Architecture & REST API Engineering',
    subtitle: 'Node.js, Express, PostgreSQL, MongoDB, SQLite & Razorpay',
    description:
      'Engineered multi-tier full-stack systems: ServiceNest (SQLite, RBAC, Razorpay payments), Expense Tracker (Neon Serverless PostgreSQL, Chart.js), LearnHub LMS, and Twitter Clone REST API (relational SQL joins and bcrypt JWT security).',
    tag: 'Full-Stack Engineering'
  },
  {
    phase: 'PHASE 04',
    year: 'Current & Ongoing',
    title: 'Advanced Web Applications & Creative UI',
    subtitle: 'MobiVerse India, Aurevo 3D Watch Store & SocialConnect',
    description:
      'Exploring 3D graphics with Three.js / React Three Fiber (Aurevo), real-time WebSockets with Socket.io (SocialConnect), and large e-commerce catalog schemas (MobiVerse India).',
    tag: 'Active Exploration'
  },
  {
    phase: 'PHASE 05',
    year: '2026 & Beyond',
    title: 'Professional Software Engineering Role',
    subtitle: 'Junior React Developer / Full-Stack Developer Opportunity',
    description:
      'Targeting full-time opportunities in high-impact engineering teams across Hyderabad, Bengaluru, Chennai, or remote setups. Committed to clean code, test-driven accessibility, and long-term craftsmanship.',
    tag: 'Career Objective'
  }
];

const LuxuryJournal = () => {
  return (
    <section className="luxury-journal section-padding" id="journal">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header">
          <span className="editorial-tag">03 / EVOLUTION & MILESTONES</span>
          <h2 className="editorial-title">
            DEVELOPMENT <span className="gold-text">JOURNAL.</span>
          </h2>
          <p className="editorial-subtitle">
            A chronological timeline of my evolution as a software craftsman—from computer application foundations to modern React architecture and cloud full-stack systems.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="journal-timeline-wrapper">
          <div className="timeline-center-spine"></div>

          {journeyMilestones.map((item, idx) => (
            <motion.div
              key={idx}
              className={`timeline-entry-row ${idx % 2 === 0 ? 'entry-left' : 'entry-right'}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Timeline Center Node */}
              <div className="timeline-node-pin">
                <span className="node-inner-dot"></span>
              </div>

              {/* Card Container */}
              <div className="timeline-entry-card">
                <div className="entry-header-meta">
                  <span className="entry-phase gold-text">{item.phase}</span>
                  <span className="entry-badge">{item.tag}</span>
                  <span className="entry-year">{item.year}</span>
                </div>

                <h3 className="entry-title">{item.title}</h3>
                <h4 className="entry-subtitle serif-italic">{item.subtitle}</h4>

                <p className="entry-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryJournal;
