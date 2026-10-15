import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import FeaturedProject from '../components/Projects/FeaturedProject';
import ProjectCard from '../components/Projects/ProjectCard';
import { api } from '../services/api';
import { FaArrowRight, FaCode, FaRocket } from 'react-icons/fa';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [profRes, projRes, skillRes] = await Promise.all([
        api.getProfile(),
        api.getProjects(),
        api.getSkills()
      ]);

      if (profRes.success) setProfile(profRes.data);
      if (projRes.success) setProjects(projRes.data);
      if (skillRes.success) setSkills(skillRes.data);
    };

    loadData();
  }, []);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p !== featuredProject).slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero profile={profile} />

      {/* 2. Primary Featured Project (ServiceNest) */}
      <section className="section-padding featured-showcase-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <FaRocket size={13} />
              <span>Full-Stack Flagship</span>
            </span>
            <h2 className="section-title">Featured Project Showcase</h2>
            <p className="section-subtitle">
              An end-to-end service marketplace demonstrating full-stack engineering, secure authentication,
              payment gateway integration, and role-based access.
            </p>
          </div>

          <FeaturedProject project={featuredProject} />
        </div>
      </section>

      {/* 3. Skills Summary */}
      <Skills skills={skills} />

      {/* 4. Portfolio Projects Grid */}
      <section className="section-padding projects-preview-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <FaCode size={13} />
              <span>Real-World Applications</span>
            </span>
            <h2 className="section-title">Recent Portfolio Projects</h2>
            <p className="section-subtitle">
              Single-page React apps and Node.js REST APIs built with JWT authentication, responsive layouts,
              and strict accessibility compliance.
            </p>
          </div>

          <div className="projects-grid">
            {otherProjects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/projects" className="btn btn-primary btn-lg">
              <span>Explore All Projects & Source Code</span>
              <FaArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. About & Objectives */}
      <About profile={profile} />
    </div>
  );
};

export default Home;
