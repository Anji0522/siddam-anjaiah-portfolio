import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCheck,
  FaBullseye,
  FaRocket,
  FaLayerGroup,
  FaCodeBranch,
  FaServer,
  FaLightbulb,
  FaArrowTrendUp
} from 'react-icons/fa6';
import './About.css';

const About = ({ profile }) => {
  const stats = [
    { value: profile?.stats?.apiApps || '4+', label: 'REST API Driven Apps', desc: 'Built and fully deployed end-to-end' },
    { value: profile?.stats?.restApis || '11', label: 'Backend REST APIs', desc: 'Node.js, Express & SQLite architecture' },
    { value: profile?.stats?.projectsCount || '5', label: 'Major Portfolio Projects', desc: 'ServiceNest, Book Hub, Jobby, Nxt Watch, Twitter' },
    { value: profile?.stats?.architecture || 'MERN', label: 'Full-Stack Architecture', desc: 'React, Node, Express, MongoDB & SQLite' }
  ];

  const highlights = [
    { title: 'React & Modern Frontend', desc: 'Expertise in React Hooks, Context API, lifecycle patterns, and custom hooks.' },
    { title: 'REST API Integration', desc: 'Seamless integration with asynchronous fetch/axios, handling loading, empty, and retry states.' },
    { title: 'JWT Authentication', desc: 'Implementing protected routing, token persistence, and role-based access security.' },
    { title: 'Node.js & Express APIs', desc: 'Building scalable REST endpoints, bcrypt password hashing, and SQL queries with joins.' },
    { title: 'Responsive & Themed UI', desc: 'Mobile-first design, Styled Components, Bootstrap, and light/dark theme persistence.' },
    { title: 'Testing & Accessibility', desc: 'Semantic HTML5, ARIA compliance, and meeting React Testing Library test specs.' }
  ];

  return (
    <section className="about-section section-padding" id="about" aria-label="About Siddam Anjaiah">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FaRocket size={13} />
            <span>About Me</span>
          </span>
          <h2 className="section-title">
            Passionate React & Full-Stack Developer
          </h2>
          <p className="section-subtitle">
            Focused on building clean, performant, and reliable web applications that solve real-world problems.
          </p>
        </div>

        {/* Stats Row */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Career Objective Banner */}
        <motion.div
          className="objective-card"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="objective-icon-badge">
            <FaBullseye size={24} />
          </div>
          <div className="objective-content">
            <h3 className="objective-title">Career Objective</h3>
            <blockquote className="objective-quote">
              "{profile?.objective || 'I am seeking a React Developer or Frontend Developer opportunity where I can apply my React, JavaScript, REST API and full-stack development skills while continuing to grow as a software developer.'}"
            </blockquote>
          </div>
        </motion.div>

        {/* Technical Strengths & Highlights */}
        <div className="about-grid">
          <div className="about-bio-col">
            <h3 className="subheading-bordered">Professional Background</h3>
            <p className="about-paragraph">
              I am a React-focused frontend developer who has developed and deployed real-world
              REST API-driven applications and full-stack systems. My projects range from complex single-page
              applications like <strong>Book Hub</strong>, <strong>Jobby App</strong>, and <strong>Nxt Watch</strong> to
              full-stack applications like <strong>ServiceNest</strong>, complete with customer and provider accounts,
              role-protected dashboards, and Razorpay payment checkout.
            </p>
            <p className="about-paragraph">
              Additionally, I designed and developed a <strong>Twitter Clone Backend</strong> featuring 11 REST APIs,
              bcrypt password encryption, relational SQL joins across five tables, and JWT middleware.
              I take pride in producing accessible, semantic markup that strictly complies with automated
              testing suites like React Testing Library.
            </p>

            <div className="target-roles-box">
              <span className="target-roles-label">Target Roles:</span>
              <div className="roles-chips">
                {(profile?.targetRoles || ['React Developer', 'Frontend Developer', 'Full-Stack Developer', 'Junior Software Developer']).map((role, i) => (
                  <span key={i} className="tech-badge">{role}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Core Competencies Cards */}
          <div className="competencies-col">
            <h3 className="subheading-bordered">Core Competencies</h3>
            <div className="highlights-grid">
              {highlights.map((h, i) => (
                <div key={i} className="highlight-item">
                  <div className="highlight-icon">
                    <FaCheck size={13} />
                  </div>
                  <div>
                    <h4 className="highlight-title">{h.title}</h4>
                    <p className="highlight-desc">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Growth Section */}
        <div className="strengths-growth-grid">
          {/* Strengths */}
          <div className="card strengths-card">
            <div className="card-header-iconic">
              <div className="card-icon-round strength-icon">
                <FaLightbulb size={20} />
              </div>
              <div>
                <h3 className="card-heading-title">My Strengths</h3>
                <p className="card-heading-sub">Key capabilities demonstrated throughout my projects</p>
              </div>
            </div>
            <div className="tags-cloud">
              {(profile?.strengths || [
                'Problem Solving',
                'Continuous Learning',
                'React Development',
                'API Integration',
                'Responsive Design',
                'Debugging',
                'Real-World Application Development',
                'Adaptability',
                'UI Attention',
                'Full-Stack Development'
              ]).map((strength, idx) => (
                <div key={idx} className="strength-chip">
                  <FaCheck size={12} className="chip-check" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement / Growth Mindset */}
          <div className="card growth-card">
            <div className="card-header-iconic">
              <div className="card-icon-round growth-icon">
                <FaArrowTrendUp size={20} />
              </div>
              <div>
                <h3 className="card-heading-title">Areas I'm Improving</h3>
                <p className="card-heading-sub">Proactive learning areas to level up full-stack engineering</p>
              </div>
            </div>
            <div className="tags-cloud">
              {(profile?.improvingAreas || [
                'Advanced backend architecture',
                'System design',
                'Advanced testing',
                'Cloud deployment',
                'Full-stack architecture',
                'Problem-solving speed'
              ]).map((area, idx) => (
                <div key={idx} className="growth-chip">
                  <span className="growth-bullet"></span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
