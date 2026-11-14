import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Sparkles, Layers, ShieldCheck, Check } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import './LuxuryProjects.css';

// 4 Key Real Verified Projects as Requested
const verifiedProjects = [
  {
    id: 'servicenest',
    number: '01',
    name: 'ServiceNest',
    roleTag: 'FULL-STACK SERVICE MARKETPLACE',
    shortDesc:
      'A production-grade service marketplace connecting customers with verified providers. Engineered with role-protected dashboards, 15+ REST endpoints, SQLite database, JWT auth, and cryptographically verified Razorpay checkout.',
    technologies: ['React.js', 'Vite', 'Node.js', 'Express.js', 'SQLite', 'JWT', 'Razorpay', 'GitHub Actions'],
    liveUrl: 'https://anji0522.github.io/ServiceNest/',
    githubUrl: 'https://github.com/Anji0522/ServiceNest',
    status: 'Production Live & Deployed',
    highlights: [
      'Customer & Provider role-based access control (RBAC)',
      '15+ Express REST endpoints with SQLite relational storage',
      'Idempotent booking creation preventing duplicate orders',
      'Signed Razorpay payment checkout & HMAC webhook verification'
    ],
    paletteAccent: '#d4af37'
  },
  {
    id: 'learnhub',
    number: '02',
    name: 'LearnHub LMS',
    roleTag: 'ONLINE LEARNING MANAGEMENT SYSTEM',
    shortDesc:
      'Online educational management platform built with React and Express. Supports student registration and HTTP-only cookie authentication, course browsing, instructor curriculum management, lesson completion tracking, and quizzes.',
    technologies: ['React 18', 'Vite', 'Node.js', 'Express 4', 'MongoDB', 'Mongoose', 'JWT (HTTP-only)', 'Recharts'],
    liveUrl: 'https://anji0522.github.io/learnhub-lms/',
    githubUrl: 'https://github.com/Anji0522/learnhub-lms',
    status: 'Static Frontend on GitHub Pages • Full-Stack Ready',
    highlights: [
      'Student registration & secure HTTP-only cookie JWT session lookup',
      'Role-protected instructor and administrator capabilities',
      'Course catalog browsing, search & multi-lesson curriculum authoring',
      'Assessment quizzes, lesson progress indicators & analytics charts'
    ],
    paletteAccent: '#f5e6a8'
  },
  {
    id: 'expense-tracker',
    number: '03',
    name: 'Expense Tracker',
    roleTag: 'FULL-STACK FINANCIAL PLATFORM',
    shortDesc:
      'Personal finance and expense management platform built with React, Express, and Neon Serverless PostgreSQL. Implements transaction logging, monthly budget targets, net savings calculation, and financial visual analytics.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL (Neon)', 'JWT', 'Vercel', 'Render'],
    liveUrl: 'https://expense-tracker-nu-nine-16.vercel.app/',
    githubUrl: 'https://github.com/Anji0522/expense-tracker',
    status: 'Frontend on Vercel • REST API on Render • Neon PostgreSQL',
    highlights: [
      'Categorized transaction logging (Income / Expense / Date)',
      'Monthly budget targets with alert thresholds and dynamic progress',
      'Relational PostgreSQL database architecture hosted on Neon Cloud',
      'Secure JWT authentication and parameterized SQL queries'
    ],
    paletteAccent: '#d4af37'
  },
  {
    id: 'jobbyapp',
    number: '04',
    name: 'JobbyApp',
    roleTag: 'REACT JOB SEARCH APPLICATION',
    shortDesc:
      'Responsive job discovery application with cookie-stored JWT authentication, two-way protected routes, unified multi-criteria filtering (employment types, minimum salary, keywords), and comprehensive job detail views.',
    technologies: ['React.js', 'React Router', 'js-cookie', 'REST APIs', 'React Testing Library'],
    liveUrl: 'https://anji0522.github.io/JobbyApp/',
    githubUrl: 'https://github.com/Anji0522/JobbyApp',
    status: 'Deployed on GitHub Pages',
    highlights: [
      'Two-way protected routing (unauthenticated & authenticated states)',
      'Unified search query combining checkboxes and salary radio buttons',
      'Job details view with company info, skill chips & similar jobs',
      'Passed strict React Testing Library accessibility & timing suites'
    ],
    paletteAccent: '#f5e6a8'
  }
];

const LuxuryProjects = () => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="luxury-projects section-padding" id="work">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header">
          <span className="editorial-tag">01 / SELECTED WORK</span>
          <h2 className="editorial-title">
            CURATED <span className="gold-text">PROJECTS.</span>
          </h2>
          <p className="editorial-subtitle">
            A showcase of production-ready full-stack applications and React platforms engineered with real backend systems, relational/document databases, and verified code on GitHub.
          </p>
        </div>

        {/* Featured Large Project Showcase Cards */}
        <div className="projects-editorial-list">
          {verifiedProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="editorial-project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.12 }}
            >
              <div className="proj-card-inner">
                {/* Left Column: Editorial Information */}
                <div className="proj-info-col">
                  <div className="proj-meta-bar">
                    <span className="proj-number gold-text">{proj.number}</span>
                    <span className="proj-category-pill">{proj.roleTag}</span>
                    <span className="proj-status-chip">
                      <span className="status-dot"></span>
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="proj-title">{proj.name}</h3>
                  <p className="proj-description">{proj.shortDesc}</p>

                  {/* Highlights List */}
                  <div className="proj-highlights-box">
                    <span className="highlights-caption">VERIFIED IMPLEMENTATION:</span>
                    <div className="highlights-list">
                      {proj.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="highlight-row">
                          <Check size={14} className="highlight-check" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Chips */}
                  <div className="proj-tech-chips">
                    {proj.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  <div className="proj-actions">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxury-primary"
                      >
                        <span>LAUNCH LIVE DEMO</span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-outline"
                    >
                      <FaGithub size={16} />
                      <span>GITHUB REPO</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Visual Mockup Screen Presentation */}
                <div className="proj-visual-col">
                  <div className="luxury-screen-mockup">
                    <div className="mockup-header-bar">
                      <div className="mockup-dots">
                        <span className="m-dot red"></span>
                        <span className="m-dot yellow"></span>
                        <span className="m-dot green"></span>
                      </div>
                      <span className="mockup-domain">{proj.githubUrl.replace('https://github.com/', '')}</span>
                      <span className="mockup-tag">VERIFIED CODE</span>
                    </div>

                    <div className="mockup-canvas">
                      <div className="mockup-brand-watermark">
                        <span className="watermark-title">{proj.name}</span>
                        <span className="watermark-role">{proj.roleTag}</span>
                      </div>

                      <div className="mockup-preview-grid">
                        <div className="canvas-card">
                          <span className="canvas-kpi-lbl">ARCHITECTURE</span>
                          <strong className="canvas-kpi-val">{proj.technologies[0]} + {proj.technologies[2] || 'API'}</strong>
                        </div>
                        <div className="canvas-card">
                          <span className="canvas-kpi-lbl">REPOSITORY</span>
                          <strong className="canvas-kpi-val">Anji0522/{proj.id}</strong>
                        </div>
                      </div>

                      <div className="mockup-terminal-strip">
                        <span className="term-prompt">$</span>
                        <span className="term-code">git clone {proj.githubUrl}.git</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Repositories on GitHub Banner */}
        <div className="projects-github-cta-strip">
          <div className="github-cta-info">
            <span className="cta-strip-tag">11 PUBLIC REPOSITORIES</span>
            <h4 className="cta-strip-heading">LOOKING FOR ALL REPOSITORIES & EXPERIMENTS?</h4>
            <p className="cta-strip-sub">
              Explore MobiVerse India, Aurevo 3D Watch Store, SocialConnect, Nxt Watch, Twitter Clone REST API and more.
            </p>
          </div>
          <a
            href="https://github.com/Anji0522"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-primary"
          >
            <FaGithub size={18} />
            <span>VISIT GITHUB PROFILE</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LuxuryProjects;
