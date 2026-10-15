import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { api } from '../../services/api';
import './Contact.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type) {
      setStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side quick validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name (minimum 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      setStatus({ type: 'error', message: 'Please enter a subject (minimum 3 characters).' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ type: 'error', message: 'Please enter a message (minimum 10 characters).' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await api.submitContact(formData);

      if (response.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for reaching out! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Trigger celebratory confetti
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } else {
        setStatus({
          type: 'error',
          message: response.message || 'Unable to submit your message. Please try again.'
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please try again or email directly at anjisiddam01@gmail.com'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section section-padding" id="contact" aria-label="Contact Section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FaEnvelope size={13} />
            <span>Get In Touch</span>
          </span>
          <h2 className="section-title">Contact & Inquiries</h2>
          <p className="section-subtitle">
            Interested in hiring me as a React or Full-Stack Developer? Have a question or collaboration proposal?
            Feel free to drop a message or reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-panel">
            <h3 className="panel-title">Let's Connect</h3>
            <p className="panel-description">
              I am actively looking for developer opportunities. You can reach out directly via email,
              phone, or connect on LinkedIn and GitHub.
            </p>

            <div className="contact-details-cards">
              <a href="mailto:anjisiddam01@gmail.com" className="direct-card">
                <div className="direct-icon-wrap email-icon">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <span className="direct-label">Email Me</span>
                  <span className="direct-value">anjisiddam01@gmail.com</span>
                </div>
              </a>

              <a href="tel:9390098364" className="direct-card">
                <div className="direct-icon-wrap phone-icon">
                  <FaPhone size={20} />
                </div>
                <div>
                  <span className="direct-label">Call / WhatsApp</span>
                  <span className="direct-value">+91 9390098364</span>
                </div>
              </a>

              <div className="direct-card non-clickable">
                <div className="direct-icon-wrap location-icon">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <span className="direct-label">Location</span>
                  <span className="direct-value">Mancherial, Telangana, India</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="social-links-panel">
              <h4 className="socials-heading">Professional Profiles:</h4>
              <div className="socials-buttons-row">
                <a
                  href="https://github.com/Anji0522"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn"
                >
                  <FaGithub size={18} />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/siddam-anjaiah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-btn"
                >
                  <FaLinkedin size={18} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel card">
            <h3 className="form-title">Send a Direct Message</h3>

            {status.type && (
              <div className={`form-alert-box alert-${status.type}`}>
                {status.type === 'success' ? (
                  <FaCheckCircle className="alert-icon" size={18} />
                ) : (
                  <FaExclamationCircle className="alert-icon" size={18} />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Your Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Email Address <span className="req">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject <span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="Job Opportunity / Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message Content <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="5"
                  placeholder="Hello Siddam, I came across your portfolio and wanted to discuss a React Developer role..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
