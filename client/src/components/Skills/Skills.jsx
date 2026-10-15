import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaLock,
  FaBootstrap,
  FaDatabase,
  FaVial
} from 'react-icons/fa';
import {
  SiJavascript,
  SiVite,
  SiStyledcomponents,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiJsonwebtokens,
  SiRazorpay,
  SiNpm,
  SiGithubactions,
  SiRender
} from 'react-icons/si';
import { TbApi, TbDevices, TbSparkles, TbBrandVscode } from 'react-icons/tb';
import { MdDarkMode } from 'react-icons/md';
import './Skills.css';

const categoryTabs = [
  'All',
  'Languages',
  'Frontend',
  'Libraries',
  'Backend',
  'Databases',
  'Testing & Tools'
];

// Helper to resolve icon by skill name
const getSkillIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('javascript')) return <SiJavascript className="icon-js" />;
  if (n.includes('html')) return <FaHtml5 className="icon-html" />;
  if (n.includes('css') || n.includes('flexbox') || n.includes('media queries')) return <FaCss3Alt className="icon-css" />;
  if (n.includes('python')) return <FaPython className="icon-python" />;
  if (n.includes('react router')) return <FaReact className="icon-react" />;
  if (n.includes('react')) return <FaReact className="icon-react spin-slow-hover" />;
  if (n.includes('vite')) return <SiVite className="icon-vite" />;
  if (n.includes('styled components')) return <SiStyledcomponents className="icon-styled" />;
  if (n.includes('bootstrap')) return <FaBootstrap className="icon-bootstrap" />;
  if (n.includes('responsive design')) return <TbDevices className="icon-generic" />;
  if (n.includes('light/dark') || n.includes('theme')) return <MdDarkMode className="icon-generic" />;
  if (n.includes('node')) return <FaNodeJs className="icon-node" />;
  if (n.includes('express')) return <SiExpress className="icon-express" />;
  if (n.includes('rest api')) return <TbApi className="icon-api" />;
  if (n.includes('jwt')) return <SiJsonwebtokens className="icon-jwt" />;
  if (n.includes('bcrypt')) return <FaLock className="icon-lock" />;
  if (n.includes('razorpay')) return <SiRazorpay className="icon-razorpay" />;
  if (n.includes('sqlite')) return <SiSqlite className="icon-sqlite" />;
  if (n.includes('mysql')) return <SiMysql className="icon-mysql" />;
  if (n.includes('mongodb')) return <SiMongodb className="icon-mongo" />;
  if (n.includes('git') && !n.includes('action') && !n.includes('hub')) return <FaGitAlt className="icon-git" />;
  if (n.includes('github actions')) return <SiGithubactions className="icon-generic" />;
  if (n.includes('github')) return <FaGithub className="icon-github" />;
  if (n.includes('render')) return <SiRender className="icon-render" />;
  if (n.includes('vs code')) return <TbBrandVscode className="icon-vscode" />;
  if (n.includes('npm')) return <SiNpm className="icon-npm" />;
  if (n.includes('testing')) return <FaVial className="icon-generic" />;
  return <TbSparkles className="icon-generic" />;
};

const Skills = ({ skills = [] }) => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredSkills = activeTab === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === activeTab.toLowerCase());

  // Group skills by category for "All" view
  const groupedSkills = categoryTabs.slice(1).map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category.toLowerCase() === cat.toLowerCase())
  }));

  return (
    <section className="skills-section section-padding" id="skills" aria-label="Technical Skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <TbSparkles size={14} />
            <span>Technical Stack</span>
          </span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Core technologies and tools I utilize to engineer reliable, accessible, and production-grade applications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="skills-tabs-container">
          <div className="skills-tabs-scroller">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Display */}
        {activeTab !== 'All' ? (
          <motion.div
            className="skills-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id || index}
                className="skill-card"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="skill-icon-wrap">
                  {getSkillIcon(skill.name)}
                </div>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category-label">{skill.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="categorized-skills-flow">
            {groupedSkills.map((group) => group.items.length > 0 && (
              <div key={group.category} className="skills-group-block">
                <div className="group-header">
                  <h3 className="group-title">{group.category}</h3>
                  <span className="group-count">{group.items.length} skills</span>
                </div>

                <div className="skills-grid">
                  {group.items.map((skill, index) => (
                    <motion.div
                      key={skill._id || index}
                      className="skill-card"
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="skill-icon-wrap">
                        {getSkillIcon(skill.name)}
                      </div>
                      <div className="skill-info">
                        <h4 className="skill-name">{skill.name}</h4>
                        <span className="skill-category-label">{skill.category}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
