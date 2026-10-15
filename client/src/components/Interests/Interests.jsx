import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLaptopCode,
  FaReact,
  FaPalette,
  FaLayerGroup,
  FaServer,
  FaLightbulb,
  FaGlobe,
  FaGithub,
  FaBrain
} from 'react-icons/fa';
import { TbSparkles } from 'react-icons/tb';
import './Interests.css';

const interestIcons = {
  'Web Development': <FaLaptopCode />,
  'React Development': <FaReact />,
  'UI/UX': <FaPalette />,
  'Full-Stack Development': <FaLayerGroup />,
  'REST API Development': <FaServer />,
  'Learning New Technologies': <FaLightbulb />,
  'Real-World Application Development': <FaGlobe />,
  'GitHub': <FaGithub />,
  'Problem Solving': <FaBrain />
};

const interestDescriptions = {
  'Web Development': 'Architecting responsive, high-performance web systems adhering to modern standards.',
  'React Development': 'Building dynamic component ecosystems with stateful hooks, context, and optimized rendering.',
  'UI/UX': 'Designing accessible, intuitive interfaces with balanced aesthetics and delightful interactions.',
  'Full-Stack Development': 'Bridging client-side interfaces seamlessly with backend databases and business logic.',
  'REST API Development': 'Constructing standardized, idempotent HTTP endpoints with rigorous validation.',
  'Learning New Technologies': 'Continuously staying abreast with latest advancements in JavaScript and cloud tools.',
  'Real-World Application Development': 'Delivering practical software that solves genuine commercial and user problems.',
  'GitHub': 'Active version control, CI/CD pipelines, documentation, and open source collaboration.',
  'Problem Solving': 'Analyzing algorithmic challenges, debugging complex issues, and optimizing pipelines.'
};

const Interests = ({ interests = [] }) => {
  return (
    <section className="interests-section section-padding" id="interests" aria-label="Professional Interests">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <TbSparkles size={14} />
            <span>Core Focus</span>
          </span>
          <h2 className="section-title">Professional Interests</h2>
          <p className="section-subtitle">
            Domains of technical passion where I invest dedicated energy to expand my skills and build impactful software.
          </p>
        </div>

        {/* Interests Grid */}
        <div className="interests-grid">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              className="interest-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <div className="interest-icon-box">
                {interestIcons[interest] || <FaLaptopCode />}
              </div>
              <h3 className="interest-name">{interest}</h3>
              <p className="interest-desc">
                {interestDescriptions[interest] || 'Focus area dedicated to engineering quality digital solutions.'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
