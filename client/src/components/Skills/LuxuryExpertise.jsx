import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Sparkles,
  Layout,
  Server,
  Database,
  GitBranch,
  Layers,
  Cpu,
  Terminal,
  Compass,
  ArrowRight
} from 'lucide-react';
import './LuxuryExpertise.css';

const expertisePillars = [
  {
    id: 'creative-dev',
    title: 'Creative Development',
    tagline: 'Bridging technical logic with visual artistry',
    desc: 'Crafting bespoke web applications using semantic HTML5, modern CSS3 (Custom Properties, Flexbox, Grid), and modular JavaScript (ES6+). Building interactive digital experiences with fluid micro-interactions and performance optimization.',
    skills: ['HTML5 Semantic Markup', 'CSS3 & Custom Properties', 'JavaScript ES6+', 'Component Architecture', 'Cross-Browser Stability']
  },
  {
    id: 'motion-interaction',
    title: 'Motion & Interaction',
    tagline: 'Orchestrating fluid, purposeful animations',
    desc: 'Designing choreography with GSAP, ScrollTrigger, and Framer Motion. Implementing smooth scroll-triggered reveals, kinetic typography, and accessible motion respecting prefers-reduced-motion standards.',
    skills: ['GSAP & ScrollTrigger', 'Framer Motion', 'Micro-Interactions', 'Hover Physics', 'Reduced Motion A11y']
  },
  {
    id: 'ui-ux-design',
    title: 'UI / UX Design',
    tagline: 'Translating concepts into luxury editorial layouts',
    desc: 'Building responsive, mobile-first design systems with high aesthetic standard, gold/cream typography contrast, consistent spacing rhythm, and intuitive navigation patterns.',
    skills: ['Responsive Web Design', 'Dark Mode Luxury Styling', 'Design Tokens & Typography', 'Accessibility (WCAG 2.1)', 'Figma to Clean Code']
  },
  {
    id: 'modern-web-apps',
    title: 'Modern Web Applications',
    tagline: 'End-to-end full-stack architectures & REST APIs',
    desc: 'Engineering scalable single-page and full-stack systems. Integrating React 18+ (Hooks, Context API) with Node.js, Express, PostgreSQL (Neon), MongoDB, SQLite, and secure JWT authentication.',
    skills: ['React.js & Hooks', 'Node.js & Express.js', 'PostgreSQL & Neon', 'MongoDB & Mongoose', 'SQLite & Relational Joins', 'REST APIs & JWT Auth', 'Git & GitHub Actions CI/CD']
  }
];

const technicalStackIcons = [
  { name: 'React.js', category: 'Frontend', desc: 'SPA & Hooks' },
  { name: 'JavaScript (ES6+)', category: 'Language', desc: 'Async & Engine' },
  { name: 'Node.js', category: 'Runtime', desc: 'Asynchronous I/O' },
  { name: 'Express.js', category: 'Backend', desc: 'REST Framework' },
  { name: 'PostgreSQL', category: 'Database', desc: 'Neon Serverless' },
  { name: 'MongoDB', category: 'Database', desc: 'Mongoose ODM' },
  { name: 'SQLite', category: 'Database', desc: 'Relational & Embedded' },
  { name: 'HTML5', category: 'Frontend', desc: 'Semantic & Accessible' },
  { name: 'CSS3', category: 'Frontend', desc: 'Grid, Flex & Custom Props' },
  { name: 'Git & GitHub', category: 'DevOps', desc: 'CI/CD & Version Control' }
];

const LuxuryExpertise = () => {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section className="luxury-expertise section-padding" id="expertise">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="editorial-header">
          <span className="editorial-tag">04 / ARCHITECTURE & CRAFT</span>
          <h2 className="editorial-title">
            TECHNICAL <span className="gold-text">EXPERTISE.</span>
          </h2>
          <p className="editorial-subtitle">
            A comprehensive inventory of my technical proficiencies, development specializations, and engineering principles grounded in real-world production projects.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="expertise-pillars-grid">
          {expertisePillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              className={`pillar-card ${activePillar === idx ? 'active-pillar' : ''}`}
              onMouseEnter={() => setActivePillar(idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="pillar-top-row">
                <span className="pillar-index">0{idx + 1}</span>
                <span className="pillar-dot"></span>
              </div>

              <h3 className="pillar-name">{pillar.title}</h3>
              <p className="pillar-tagline serif-italic">{pillar.tagline}</p>

              <p className="pillar-description">{pillar.desc}</p>

              <div className="pillar-skills-list">
                {pillar.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="pillar-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Core Stack Strip */}
        <div className="core-stack-section">
          <div className="core-stack-header">
            <h4 className="core-stack-title">TECHNOLOGIES & TOOLKIT</h4>
            <span className="core-stack-sub">TESTED IN CODEBASES & GITHUB REPOSITORIES</span>
          </div>

          <div className="core-stack-grid">
            {technicalStackIcons.map((tech, idx) => (
              <div key={idx} className="core-tech-card">
                <div className="tech-card-glow" />
                <span className="tech-category">{tech.category}</span>
                <h5 className="tech-name">{tech.name}</h5>
                <span className="tech-desc">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryExpertise;
