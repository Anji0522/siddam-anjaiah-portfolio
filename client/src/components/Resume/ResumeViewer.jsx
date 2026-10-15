import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
  FaCheckCircle,
  FaEye,
  FaPrint
} from 'react-icons/fa';
import './Resume.css';

const ResumeViewer = ({ resumeUrl = '/assets/Siddam_Anjaiah_React_Frontend_Resume_1Page.pdf' }) => {
  const [activeTab, setActiveTab] = useState('embed');

  return (
    <div className="resume-viewer-container">
      {/* Top Action Bar */}
      <div className="resume-action-bar">
        <div className="resume-file-info">
          <div className="pdf-icon-badge">
            <FaFilePdf size={24} />
          </div>
          <div>
            <h3 className="resume-filename">Siddam_Anjaiah_React_Frontend_Resume_1Page.pdf</h3>
            <span className="resume-filesize">Verified 1-Page Developer Resume • PDF Document</span>
          </div>
        </div>

        <div className="resume-cta-buttons">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            title="Open Resume PDF in New Browser Tab"
          >
            <FaExternalLinkAlt size={14} />
            <span>Open in Tab</span>
          </a>

          <a
            href={resumeUrl}
            download="Siddam_Anjaiah_React_Frontend_Resume.pdf"
            className="btn btn-primary"
            title="Download Official Resume PDF"
          >
            <FaDownload size={14} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* PDF Viewer Frame */}
      <div className="resume-frame-wrapper">
        <object
          data={`${resumeUrl}#toolbar=0&navpanes=0`}
          type="application/pdf"
          className="resume-pdf-object"
        >
          <div className="pdf-fallback-content">
            <FaFilePdf size={48} className="fallback-pdf-icon" />
            <h4>Resume PDF Viewer</h4>
            <p>
              Your browser may not support inline PDF previews on this device. You can directly view or download the complete PDF using the buttons below.
            </p>
            <div className="fallback-actions">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaEye size={14} />
                <span>View Resume Online</span>
              </a>
              <a
                href={resumeUrl}
                download="Siddam_Anjaiah_React_Frontend_Resume.pdf"
                className="btn btn-secondary"
              >
                <FaDownload size={14} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </object>
      </div>

      {/* Verified Resume Highlights Summary */}
      <div className="resume-summary-card card">
        <h4 className="summary-title">Summary of Resume Highlights</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <strong>Candidate:</strong>
            <span>Siddam Anjaiah</span>
          </div>
          <div className="summary-item">
            <strong>Target Roles:</strong>
            <span>React Developer, Frontend Developer, Full-Stack Developer</span>
          </div>
          <div className="summary-item">
            <strong>Key Projects:</strong>
            <span>ServiceNest, Book Hub, Jobby App, Nxt Watch, Twitter Clone Backend</span>
          </div>
          <div className="summary-item">
            <strong>Education:</strong>
            <span>B.Com Computer Applications (CGPA 6.63) • Intermediate (50.6%) • 10th (GPA 8.3)</span>
          </div>
          <div className="summary-item">
            <strong>Certifications:</strong>
            <span>NxtWave CCBP (React JS, JavaScript, Databases, Web Design)</span>
          </div>
          <div className="summary-item">
            <strong>Location & Contact:</strong>
            <span>Mancherial, Telangana • anjisiddam01@gmail.com • 9390098364</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
