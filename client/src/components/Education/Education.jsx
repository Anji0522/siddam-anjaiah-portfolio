import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward, FaCheckCircle } from 'react-icons/fa';
import './Education.css';

const Education = ({ education = [] }) => {
  return (
    <section className="education-section section-padding" id="education" aria-label="Education Timeline">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FaGraduationCap size={14} />
            <span>Academic Background</span>
          </span>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal educational milestones providing strong foundations in computer applications, analytical thinking, and mathematics.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline-container">
          <div className="timeline-track" />

          {education.map((item, index) => (
            <motion.div
              key={item._id || index}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Timeline Node Point */}
              <div className="timeline-node">
                <FaGraduationCap size={16} />
              </div>

              {/* Timeline Card */}
              <div className="timeline-content-card">
                <div className="timeline-card-header">
                  <span className="timeline-year-tag">
                    <FaCalendarAlt size={11} />
                    <span>{item.year}</span>
                  </span>
                  <span className="timeline-score-badge">
                    <FaAward size={11} />
                    <span>{item.score}</span>
                  </span>
                </div>

                <h3 className="timeline-qualification">{item.qualification}</h3>

                <h4 className="timeline-institution">{item.institution}</h4>

                <div className="timeline-location">
                  <FaMapMarkerAlt size={12} className="loc-icon" />
                  <span>{item.location}</span>
                </div>

                {item.details && item.details.length > 0 && (
                  <ul className="timeline-details-list">
                    {item.details.map((detail, i) => (
                      <li key={i}>
                        <FaCheckCircle className="detail-check" size={12} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
