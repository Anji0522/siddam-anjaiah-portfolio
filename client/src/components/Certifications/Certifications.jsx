import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaCheck } from 'react-icons/fa';
import './Certifications.css';

const Certifications = ({ certifications = [] }) => {
  return (
    <section className="certifications-section section-padding" id="certifications" aria-label="Certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FaCertificate size={13} />
            <span>Verified Credentials</span>
          </span>
          <h2 className="section-title">Certifications & Training</h2>
          <p className="section-subtitle">
            Formal technical certifications issued by NxtWave Disruptive Technologies (CCBP 4.0 Academy),
            validating practical software development and coding proficiency.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              className="cert-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="cert-card-header">
                <div className="cert-badge-icon">
                  <FaCertificate size={22} />
                </div>
                {cert.date && (
                  <div className="cert-date-badge">
                    <FaCalendarAlt size={11} />
                    <span>{cert.date}</span>
                  </div>
                )}
              </div>

              <h3 className="cert-title">{cert.title}</h3>

              <div className="cert-issuer">
                <FaBuilding size={12} className="issuer-icon" />
                <span>{cert.organization}</span>
              </div>

              <p className="cert-desc">{cert.description}</p>

              {/* Skills Covered Chips */}
              {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                <div className="cert-skills-row">
                  {cert.skillsCovered.map((skill, i) => (
                    <span key={i} className="cert-skill-tag">
                      <FaCheck size={9} />
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <div className="cert-card-footer">
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary view-cert-btn"
                  >
                    <span>View Certificate</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                ) : (
                  <span className="cert-pending-badge">Verified Academic Record</span>
                )}

                {cert.credentialId && (
                  <span className="credential-id-text">
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
