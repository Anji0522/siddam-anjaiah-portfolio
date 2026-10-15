import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaDownload,
  FaReact,
  FaNodeJs,
  FaCheckCircle
} from 'react-icons/fa';
import { SiJavascript, SiMongodb } from 'react-icons/si';
import './Hero.css';

const Hero = ({ profile }) => {
  const resumeUrl = profile?.resumeUrl || '/assets/Siddam_Anjaiah_React_Frontend_Resume_1Page.pdf';

  return (
    <section className="hero-section" aria-label="Introduction Hero">
      <div className="hero-background-glow glow-1" />
      <div className="hero-background-glow glow-2" />

      <div className="container hero-container">
        {/* Left Column: Text Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Status Badge */}
          <div className="hero-status-pill">
            <span className="pulsing-dot" />
            <span>Available for React & Full-Stack Developer Roles</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Siddam Anjaiah</span>
          </h1>

          <h2 className="hero-subtitle-role">
            React Frontend Developer <span className="role-divider">|</span> Full-Stack Developer
          </h2>

          <p className="hero-description">
            Building responsive, accessible and user-focused web applications with React, JavaScript
            and modern full-stack technologies. Experienced in developing REST API-driven architectures,
            secure JWT authentication, role-based workflows, and database integrations.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary btn-lg">
              <span>View My Projects</span>
              <FaArrowRight size={15} />
            </Link>

            <a
              href={resumeUrl}
              download="Siddam_Anjaiah_React_Frontend_Resume.pdf"
              className="btn btn-secondary btn-lg"
              title="Download Resume"
            >
              <FaDownload size={15} />
              <span>Download Resume</span>
            </a>

            <Link to="/contact" className="btn btn-outline btn-lg">
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Social Links & Quick Contact */}
          <div className="hero-socials">
            <span className="social-label">Connect:</span>
            <div className="hero-social-icons">
              <a
                href="https://github.com/Anji0522"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                aria-label="GitHub Profile"
                title="GitHub: https://github.com/Anji0522"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/siddam-anjaiah/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                aria-label="LinkedIn Profile"
                title="LinkedIn: https://www.linkedin.com/in/siddam-anjaiah/"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:anjisiddam01@gmail.com"
                className="hero-social-icon"
                aria-label="Send Email"
                title="Email: anjisiddam01@gmail.com"
              >
                <FaEnvelope size={20} />
              </a>

              <a
                href="tel:9390098364"
                className="hero-social-icon"
                aria-label="Call Siddam Anjaiah"
                title="Phone: 9390098364"
              >
                <FaPhone size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Showcase */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="profile-card-wrapper">
            {/* Ambient Profile Frame */}
            <div className="profile-image-container">
              <img
                src={profile?.profileImage || '/assets/profile-image.jpeg'}
                alt="Siddam Anjaiah - React Frontend Developer"
                className="profile-photo"
                onError={(e) => {
                  // Fallback to dev avatar if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="avatar-fallback" style={{ display: 'none' }}>
                <span className="avatar-letters">SA</span>
              </div>
              <div className="profile-badge-verified">
                <FaCheckCircle className="check-icon" />
                <span>Verified Full-Stack</span>
              </div>
            </div>

            {/* Floating Floating Tech Badges */}
            <motion.div
              className="floating-card float-react"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <FaReact className="react-icon spin-slow" size={26} />
              <div>
                <span className="float-title">React.js</span>
                <span className="float-sub">SPA & Hooks</span>
              </div>
            </motion.div>

            <motion.div
              className="floating-card float-node"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
            >
              <FaNodeJs className="node-icon" size={26} />
              <div>
                <span className="float-title">Node & Express</span>
                <span className="float-sub">11+ REST APIs</span>
              </div>
            </motion.div>

            <motion.div
              className="floating-card float-mongo"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
            >
              <SiMongodb className="mongo-icon" size={24} />
              <div>
                <span className="float-title">MongoDB</span>
                <span className="float-sub">Mongoose ORM</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
