import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaShieldAlt,
  FaCreditCard,
  FaDatabase,
  FaCheckCircle,
  FaStar,
  FaArrowRight
} from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiExpress, SiSqlite, SiRazorpay } from 'react-icons/si';
import './Projects.css';

const FeaturedProject = ({ project }) => {
  if (!project) return null;

  return (
    <div className="featured-project-container">
      <div className="featured-badge-header">
        <FaStar className="star-icon" />
        <span>Primary Featured Full-Stack Application</span>
      </div>

      <div className="featured-card">
        <div className="featured-grid">
          {/* Left Column: Details */}
          <div className="featured-info">
            <div className="featured-category-tag">
              <span className="dot-pulse" />
              <span>{project.category || 'Full-Stack'} Marketplace</span>
            </div>

            <h3 className="featured-title">{project.title}</h3>
            <h4 className="featured-subtitle">{project.subtitle}</h4>

            <p className="featured-description">
              {project.longDescription || project.description}
            </p>

            {/* Architecture Highlights */}
            <div className="featured-arch-pills">
              <div className="arch-pill">
                <FaShieldAlt className="pill-icon" />
                <span>Role-Based Auth (JWT + bcrypt)</span>
              </div>
              <div className="arch-pill">
                <FaCreditCard className="pill-icon" />
                <span>Razorpay Checkout & Webhooks</span>
              </div>
              <div className="arch-pill">
                <FaDatabase className="pill-icon" />
                <span>15+ REST Endpoints (SQLite)</span>
              </div>
            </div>

            {/* Key Features Bullet List */}
            <div className="featured-features-preview">
              <h5 className="features-subheading">Core Capabilities:</h5>
              <div className="features-checklist">
                {(project.features || []).slice(0, 6).map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <FaCheckCircle className="check-bullet" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="featured-tech-row">
              {(project.technologies || []).map((tech, idx) => (
                <span key={idx} className="tech-badge">{tech}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="featured-actions">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Live Demo</span>
                  <FaExternalLinkAlt size={14} />
                </a>
              )}

              <a
                href={project.githubUrl || 'https://github.com/Anji0522'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FaGithub size={16} />
                <span>View Source</span>
              </a>

              <Link
                to={`/projects/${project.slug || project._id}`}
                className="btn btn-outline"
              >
                <span>Full Case Study</span>
                <FaArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Architecture Mockup */}
          <div className="featured-visual">
            <div className="mockup-window">
              <div className="mockup-titlebar">
                <div className="window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="window-address">
                  <span>https://anji0522.github.io/ServiceNest/</span>
                </div>
              </div>

              <div className="mockup-content">
                <div className="mockup-hero-banner">
                  <div className="mockup-brand-row">
                    <div className="mockup-logo">ServiceNest</div>
                    <div className="mockup-nav-pills">
                      <span>Services</span>
                      <span>Bookings</span>
                      <span className="pill-active">Dashboard</span>
                    </div>
                  </div>

                  <div className="mockup-headline">
                    <h4>Find Trusted Local Experts</h4>
                    <p>Role-protected service marketplace with verified bookings</p>
                  </div>

                  <div className="mockup-cards-row">
                    <div className="mockup-mini-card">
                      <span className="mini-icon blue">⚡</span>
                      <strong>15+ REST APIs</strong>
                      <small>Role permissions</small>
                    </div>
                    <div className="mockup-mini-card">
                      <span className="mini-icon green">💳</span>
                      <strong>Razorpay</strong>
                      <small>Webhook verified</small>
                    </div>
                    <div className="mockup-mini-card">
                      <span className="mini-icon purple">💬</span>
                      <strong>Live Chat</strong>
                      <small>Participant-only</small>
                    </div>
                  </div>
                </div>

                <div className="mockup-stats-bar">
                  <div className="mockup-stat">
                    <strong>Customer & Provider</strong>
                    <span>Dual Role Dashboards</span>
                  </div>
                  <div className="mockup-stat">
                    <strong>Idempotent</strong>
                    <span>Zero Double-Charge</span>
                  </div>
                  <div className="mockup-stat">
                    <strong>Render CI/CD</strong>
                    <span>Production Hosted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
