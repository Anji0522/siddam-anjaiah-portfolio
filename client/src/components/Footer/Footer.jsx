import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaCode } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Summary */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-badge">SA</span>
              <span className="logo-text">
                Siddam <span className="logo-highlight">Anjaiah</span>
              </span>
            </Link>
            <p className="footer-bio">
              React Frontend Developer & Full-Stack Developer specialized in building responsive,
              accessible, and REST API-driven web applications with modern MERN architecture.
            </p>
            <div className="footer-social-row">
              <a
                href="https://github.com/Anji0522"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub Profile"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/siddam-anjaiah/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:anjisiddam01@gmail.com"
                className="footer-social-icon"
                aria-label="Email Siddam Anjaiah"
              >
                <FaEnvelope size={18} />
              </a>
              <a
                href="tel:9390098364"
                className="footer-social-icon"
                aria-label="Call Siddam Anjaiah"
              >
                <FaPhone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Me</Link></li>
              <li><Link to="/skills">Skills & Stack</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/certifications">Certifications</Link></li>
            </ul>
          </div>

          {/* Portfolio & Education */}
          <div className="footer-col">
            <h4 className="footer-heading">Portfolio</h4>
            <ul className="footer-links-list">
              <li><Link to="/education">Education</Link></li>
              <li><Link to="/interests">Professional Interests</Link></li>
              <li><Link to="/resume">Resume Viewer</Link></li>
              <li><Link to="/contact">Get in Touch</Link></li>
              <li><Link to="/admin/login">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Details</h4>
            <div className="footer-contact-items">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:anjisiddam01@gmail.com">anjisiddam01@gmail.com</a>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:9390098364">+91 9390098364</a>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Mancherial, Telangana, India</span>
              </div>
              <div className="contact-item availability-item">
                <span className="status-dot"></span>
                <span>Open for React / Frontend roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} Siddam Anjaiah. All rights reserved.
          </p>
          <div className="footer-tech-stack">
            <FaCode size={14} />
            <span>Built with React, Vite, Node.js, Express & MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
