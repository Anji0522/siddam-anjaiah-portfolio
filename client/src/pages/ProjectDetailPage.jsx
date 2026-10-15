import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaCheckCircle,
  FaLayerGroup,
  FaServer,
  FaShieldAlt,
  FaDatabase,
  FaCloudUploadAlt,
  FaBrain,
  FaLightbulb
} from 'react-icons/fa';
import { api } from '../services/api';
import './ProjectDetail.css';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProjectById(id);
        if (res.success) {
          setProject(res.data);
        } else {
          setError(res.message || 'Project not found');
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading-box">
        <div className="custom-spinner" />
        <p>Loading project architecture...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Project Not Found</h2>
        <p style={{ margin: '1rem 0 2rem 0' }}>{error || 'Unable to locate project.'}</p>
        <Link to="/projects" className="btn btn-primary">
          <FaArrowLeft size={14} />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="project-detail-page section-padding"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="breadcrumb-nav">
          <Link to="/projects" className="back-link">
            <FaArrowLeft size={13} />
            <span>Back to All Projects</span>
          </Link>
          <span className="breadcrumb-divider">/</span>
          <span className="breadcrumb-current">{project.title}</span>
        </div>

        {/* Header Hero Banner */}
        <div className="detail-header-card card">
          <div className="detail-header-top">
            <span className="category-tag">{project.category || 'Web Application'}</span>
            {project.featured && <span className="featured-pill">Featured Project</span>}
          </div>

          <h1 className="detail-title">{project.title}</h1>
          <h2 className="detail-subtitle">{project.subtitle}</h2>

          <p className="detail-desc">{project.description}</p>

          {/* Action CTAs */}
          <div className="detail-ctas">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <span>Launch Live Demo</span>
                <FaExternalLinkAlt size={14} />
              </a>
            )}

            <a
              href={project.githubUrl || 'https://github.com/Anji0522'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <FaGithub size={17} />
              <span>GitHub Repository</span>
            </a>
          </div>

          {/* Technologies Bar */}
          <div className="detail-tech-bar">
            <span className="tech-bar-label">Stack:</span>
            <div className="tech-badges-wrap">
              {(project.technologies || []).map((t, i) => (
                <span key={i} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Architecture Grid */}
        <div className="detail-body-grid">
          {/* Main Column */}
          <div className="detail-main-col">
            {/* Overview / Long Description */}
            <div className="content-block card">
              <h3 className="block-title">Overview & Purpose</h3>
              <p className="block-text">{project.longDescription}</p>
            </div>

            {/* Problem Solved */}
            {project.problemSolved && (
              <div className="content-block card">
                <h3 className="block-title">
                  <FaBrain className="block-icon" />
                  <span>Problem Solved</span>
                </h3>
                <p className="block-text">{project.problemSolved}</p>
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="content-block card">
                <h3 className="block-title">
                  <FaCheckCircle className="block-icon" />
                  <span>Key Features & Specifications</span>
                </h3>
                <div className="features-grid-list">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="feature-grid-item">
                      <FaCheckCircle className="item-check" size={13} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APIs & Endpoints */}
            {project.apis && project.apis.length > 0 && (
              <div className="content-block card">
                <h3 className="block-title">
                  <FaServer className="block-icon" />
                  <span>API Endpoints & Integration</span>
                </h3>
                <div className="api-endpoints-list">
                  {project.apis.map((endpoint, idx) => (
                    <div key={idx} className="api-endpoint-badge">
                      <code>{endpoint}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Learnings */}
            <div className="challenges-learnings-row">
              {project.challenges && (
                <div className="content-block card">
                  <h4 className="block-subtitle">
                    <FaLightbulb className="block-icon" />
                    <span>Technical Challenges</span>
                  </h4>
                  <p className="block-text">{project.challenges}</p>
                </div>
              )}

              {project.whatILearned && (
                <div className="content-block card">
                  <h4 className="block-subtitle">
                    <FaBrain className="block-icon" />
                    <span>What I Learned</span>
                  </h4>
                  <p className="block-text">{project.whatILearned}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Architecture Specifications */}
          <div className="detail-sidebar-col">
            <div className="arch-spec-card card">
              <h3 className="spec-heading">Technical Architecture</h3>

              <div className="spec-group">
                <div className="spec-label">
                  <FaLayerGroup className="spec-icon" />
                  <span>Frontend Architecture</span>
                </div>
                <p className="spec-desc">
                  {project.frontendArchitecture || 'Built with React, stateful hooks, and component modularity.'}
                </p>
              </div>

              <div className="spec-group">
                <div className="spec-label">
                  <FaServer className="spec-icon" />
                  <span>Backend Architecture</span>
                </div>
                <p className="spec-desc">
                  {project.backendArchitecture || 'Node.js, Express.js REST API with structured controllers and routes.'}
                </p>
              </div>

              <div className="spec-group">
                <div className="spec-label">
                  <FaShieldAlt className="spec-icon" />
                  <span>Authentication</span>
                </div>
                <p className="spec-desc">
                  {project.authentication || 'JWT (JSON Web Token) with protected routing and security checks.'}
                </p>
              </div>

              <div className="spec-group">
                <div className="spec-label">
                  <FaDatabase className="spec-icon" />
                  <span>Database</span>
                </div>
                <p className="spec-desc">
                  {project.database || 'Database integrated with relational or document store.'}
                </p>
              </div>

              <div className="spec-group">
                <div className="spec-label">
                  <FaCloudUploadAlt className="spec-icon" />
                  <span>Deployment & CI/CD</span>
                </div>
                <p className="spec-desc">
                  {project.deployment || 'Configured for production cloud deployment and automated CI/CD.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
