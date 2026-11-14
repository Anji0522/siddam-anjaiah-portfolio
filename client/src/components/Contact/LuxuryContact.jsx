import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { api } from '../../services/api';
import './LuxuryContact.css';

const LuxuryContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (feedback.type) {
      setFeedback({ type: null, text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFeedback({ type: 'error', text: 'Please provide your name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setFeedback({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFeedback({ type: 'error', text: 'Please enter a message with at least 10 characters.' });
      return;
    }

    setLoading(true);
    setFeedback({ type: null, text: '' });

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `Portfolio Inquiry from ${formData.name.trim()}`,
        message: formData.message.trim()
      };

      const res = await api.submitContact(payload);

      if (res.success) {
        setFeedback({
          type: 'success',
          text: 'Your message has been received! I will review it and respond shortly.'
        });
        setFormData({ name: '', email: '', message: '' });

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#d4af37', '#f5e6a8', '#f4efe6']
        });
      } else {
        setFeedback({
          type: 'error',
          text: res.message || 'Unable to submit your message. Please reach out directly via email.'
        });
      }
    } catch (err) {
      console.error('Contact error:', err);
      setFeedback({
        type: 'error',
        text: 'A network error occurred. Please contact directly at anjisiddam01@gmail.com'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="luxury-contact section-padding" id="contact">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header">
          <span className="editorial-tag">05 / GET IN TOUCH</span>
          <h2 className="editorial-title">
            LET'S CREATE <span className="gold-text">SOMETHING MEANINGFUL.</span>
          </h2>
          <p className="editorial-subtitle">
            Whether you have an open React / Full-Stack position, a collaborative project idea, or simply want to connect, my inbox is always open.
          </p>
        </div>

        {/* Contact Layout: Info Panel + Working Form */}
        <div className="contact-editorial-grid">
          {/* Left Column: Professional Information Panel */}
          <div className="contact-info-panel">
            <div className="info-panel-inner">
              <span className="panel-tag">DIRECT INQUIRIES</span>
              <h3 className="panel-heading">CONTACT INFORMATION</h3>

              <div className="contact-methods-list">
                <a href="mailto:anjisiddam01@gmail.com" className="method-item">
                  <div className="method-icon">
                    <Mail size={18} />
                  </div>
                  <div className="method-text">
                    <span className="method-label">ELECTRONIC MAIL</span>
                    <span className="method-val">anjisiddam01@gmail.com</span>
                  </div>
                  <ArrowUpRight size={15} className="method-arrow" />
                </a>

                <a href="tel:9390098364" className="method-item">
                  <div className="method-icon">
                    <Phone size={18} />
                  </div>
                  <div className="method-text">
                    <span className="method-label">PHONE / WHATSAPP</span>
                    <span className="method-val">+91 9390098364</span>
                  </div>
                  <ArrowUpRight size={15} className="method-arrow" />
                </a>

                <div className="method-item static-method">
                  <div className="method-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="method-text">
                    <span className="method-label">PRIMARY LOCATION</span>
                    <span className="method-val">Mancherial, Telangana, India</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="panel-socials-block">
                <span className="socials-label">VERIFIED PROFILES</span>
                <div className="social-pill-group">
                  <a
                    href="https://github.com/Anji0522"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                  >
                    <FaGithub size={16} />
                    <span>github.com/Anji0522</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/siddam-anjaiah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                  >
                    <FaLinkedin size={16} />
                    <span>linkedin.com/in/siddam-anjaiah</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="luxury-contact-form" noValidate>
              <h3 className="form-legend">SEND AN INQUIRY</h3>

              {feedback.type && (
                <div className={`form-feedback-alert ${feedback.type}`}>
                  {feedback.type === 'success' ? (
                    <CheckCircle size={18} className="feedback-icon" />
                  ) : (
                    <AlertCircle size={18} className="feedback-icon" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  YOUR NAME <span className="gold-text">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="e.g. Alexander Vance"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="luxury-input"
                />
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  EMAIL ADDRESS <span className="gold-text">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="e.g. alexander@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="luxury-input"
                />
              </div>

              {/* Message Input */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  YOUR MESSAGE <span className="gold-text">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about the project, role, or idea you have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="luxury-textarea"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="btn-luxury-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {loading ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={15} />
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

export default LuxuryContact;
