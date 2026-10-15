import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaArrowRight, FaCheck } from 'react-icons/fa';
import './Projects.css';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="project-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      layout
    >
      {/* Card Header / Image or Illustration Banner */}
      <div className="project-card-banner">
        <div className="banner-overlay" />
        <div className="banner-content">
          <span className="card-category-tag">{project.category || 'Web App'}</span>
          <h4 className="banner-title">{project.title}</h4>
        </div>
      </div>

      {/* Card Body */}
      <div className="project-card-body">
        <p className="project-card-desc">{project.description}</p>

        {/* Features highlight (first 3) */}
        {project.features && project.features.length > 0 && (
          <div className="card-features-list">
            {project.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="card-feature-item">
                <FaCheck size={11} className="feature-check" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="card-tech-chips">
          {(project.technologies || []).map((tech, idx) => (
            <span key={idx} className="tech-badge">{tech}</span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="project-card-footer">
        <div className="card-action-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
              title={`Live demo of ${project.title}`}
            >
              <span>Live Demo</span>
              <FaExternalLinkAlt size={12} />
            </a>
          )}

          <a
            href={project.githubUrl || 'https://github.com/Anji0522'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-secondary"
            title={`GitHub repository of ${project.title}`}
          >
            <FaGithub size={14} />
            <span>Code</span>
          </a>
        </div>

        <Link
          to={`/projects/${project.slug || project._id}`}
          className="view-details-link"
          title={`View full details of ${project.title}`}
        >
          <span>Details</span>
          <FaArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
