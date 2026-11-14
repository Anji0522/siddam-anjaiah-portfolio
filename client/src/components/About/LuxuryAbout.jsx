import React from 'react';
import { motion } from 'framer-motion';
import { Download, GraduationCap, Target, Heart, ArrowUpRight, Award, MapPin } from 'lucide-react';
import profileImg from '../../assets/profile-image.jpeg';
import './LuxuryAbout.css';

const LuxuryAbout = () => {
  return (
    <section className="luxury-about section-padding" id="about">
      <div className="container">
        {/* Editorial Header */}
        <div className="editorial-header">
          <span className="editorial-tag">02 / WHO I AM</span>
          <h2 className="editorial-title">
            BUILDING DIGITAL WORLDS WITH <span className="gold-text">CODE & CREATIVITY.</span>
          </h2>
          <p className="editorial-subtitle">
            An aspiring Full-Stack Developer passionate about engineering modern, responsive, and user-centric web ecosystems that unite architectural performance with creative luxury design.
          </p>
        </div>

        {/* Main Grid: Portrait + Biography */}
        <div className="about-main-grid">
          {/* Left Column: Portrait & Highlights Card */}
          <div className="about-portrait-col">
            <div className="portrait-frame">
              <div className="portrait-corner-tl"></div>
              <div className="portrait-corner-br"></div>
              <img
                src={profileImg}
                alt="Siddam Anjaiah - React & Full-Stack Developer"
                className="portrait-img"
              />
              <div className="portrait-caption-bar">
                <div className="caption-live-status">
                  <span className="live-pulse"></span>
                  <span>OPEN FOR FULL-TIME ROLES</span>
                </div>
                <span className="caption-loc">MANCHERIAL, TELANGANA</span>
              </div>
            </div>

            {/* Resume Download CTA Card */}
            <div className="about-resume-banner">
              <div>
                <h4 className="resume-cta-title">OFFICIAL DEVELOPER CV</h4>
                <p className="resume-cta-sub">Verified curriculum vitae with project technical breakdowns and skills.</p>
              </div>
              <a
                href="./assets/Siddam_Anjaiah_React_Frontend_Resume.pdf"
                download="Siddam_Anjaiah_React_Frontend_Resume.pdf"
                className="btn-luxury-primary"
              >
                <Download size={16} />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </div>

          {/* Right Column: Narrative, Education, Interests, Objectives */}
          <div className="about-narrative-col">
            {/* Professional Introduction */}
            <div className="narrative-card">
              <h3 className="card-headline">THE JOURNEY</h3>
              <p className="narrative-p">
                I am <strong className="cream-text">Siddam Anjaiah</strong>, an entry-level React and Full-Stack Developer dedicated to building scalable REST API-driven web applications and immersive digital experiences. With a foundation spanning React Hooks, Context API, responsive layout architecture, Node.js, Express, PostgreSQL, and MongoDB, I bridge the gap between creative visual presentation and robust back-end systems.
              </p>
              <p className="narrative-p">
                Every project I build—from full-stack marketplaces like <strong className="gold-text">ServiceNest</strong> and <strong className="gold-text">MobiVerse India</strong> to cloud finance platforms like <strong className="gold-text">Expense Tracker</strong>—prioritizes clean code, accessible semantic HTML, and intuitive user experiences.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="about-metrics-grid">
              <div className="metric-box">
                <span className="metric-num gold-text">11+</span>
                <span className="metric-lbl">GITHUB REPOSITORIES</span>
              </div>
              <div className="metric-box">
                <span className="metric-num gold-text">25+</span>
                <span className="metric-lbl">REST APIS BUILT</span>
              </div>
              <div className="metric-box">
                <span className="metric-num gold-text">100%</span>
                <span className="metric-lbl">RESPONSIVE & TEST-READY</span>
              </div>
            </div>

            {/* Educational Background & Career Objective Tabs/Cards */}
            <div className="about-accordion-grid">
              {/* Education */}
              <div className="about-sub-card">
                <div className="sub-card-header">
                  <div className="sub-card-icon">
                    <GraduationCap size={18} />
                  </div>
                  <h4 className="sub-card-title">ACADEMIC BACKGROUND</h4>
                </div>
                <div className="edu-entry">
                  <div className="edu-top">
                    <span className="edu-deg">B.Com (Computer Applications)</span>
                    <span className="edu-year">2021 – 2024</span>
                  </div>
                  <span className="edu-col">Vivekavardhini Degree College, Mancherial</span>
                  <span className="edu-score">CGPA: 6.23 • Software Engineering Foundations</span>
                </div>
                <div className="edu-entry" style={{ marginTop: '0.85rem' }}>
                  <div className="edu-top">
                    <span className="edu-deg">Intermediate (CEC)</span>
                    <span className="edu-year">2021</span>
                  </div>
                  <span className="edu-col">TS Model School & Junior College, Mancherial</span>
                </div>
              </div>

              {/* Career Objectives */}
              <div className="about-sub-card">
                <div className="sub-card-header">
                  <div className="sub-card-icon">
                    <Target size={18} />
                  </div>
                  <h4 className="sub-card-title">CAREER OBJECTIVE</h4>
                </div>
                <p className="sub-card-text">
                  Seeking a Junior React Developer, Frontend Developer, or Junior Full-Stack role where I can apply my expertise in modern component architecture, state synchronization, and REST APIs to high-impact products while learning from senior engineering mentors.
                </p>
                <div className="relocation-badge">
                  <MapPin size={13} />
                  <span>Open to Relocate: Hyderabad, Bengaluru, Chennai & Remote</span>
                </div>
              </div>

              {/* Development Interests */}
              <div className="about-sub-card full-span">
                <div className="sub-card-header">
                  <div className="sub-card-icon">
                    <Heart size={18} />
                  </div>
                  <h4 className="sub-card-title">DEVELOPMENT INTERESTS & PASSIONS</h4>
                </div>
                <div className="interest-chips">
                  <span className="interest-chip">Creative Web Development</span>
                  <span className="interest-chip">Component-Driven Architecture</span>
                  <span className="interest-chip">GSAP & Framer Motion</span>
                  <span className="interest-chip">Full-Stack System Design</span>
                  <span className="interest-chip">Relational & Document Databases</span>
                  <span className="interest-chip">Payment Gateway Integrations</span>
                  <span className="interest-chip">Accessibility & Web Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryAbout;
