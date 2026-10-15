import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FeaturedProject from '../components/Projects/FeaturedProject';
import ProjectCard from '../components/Projects/ProjectCard';
import GithubRepos from '../components/Projects/GithubRepos';
import { api } from '../services/api';
import { FaSearch, FaFilter, FaSortAmountDown, FaCode, FaTimes } from 'react-icons/fa';
import '../components/Projects/Projects.css';

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProjects = async () => {
      setLoading(true);
      const res = await api.getProjects();
      if (res.success) {
        setProjects(res.data);
      }
      setLoading(false);
    };
    loadProjects();
  }, []);

  // Extract all unique technologies from loaded projects
  const allTechnologies = ['All', ...new Set(projects.flatMap((p) => p.technologies || []))].sort();

  // Filter & Sort Logic
  const filteredProjects = projects.filter((project) => {
    // Category filter
    const matchesCategory =
      selectedCategory === 'All' || project.category?.toLowerCase() === selectedCategory.toLowerCase();

    // Technology filter
    const matchesTech =
      selectedTech === 'All' ||
      (project.technologies && project.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase()));

    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      (project.technologies && project.technologies.some((t) => t.toLowerCase().includes(searchLower)));

    return matchesCategory && matchesTech && matchesSearch;
  });

  // Sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return (a.order || 0) - (b.order || 0);
  });

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  return (
    <div className="projects-page section-padding">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="section-tag">
            <FaCode size={13} />
            <span>Portfolio Showcase</span>
          </span>
          <h1 className="section-title">Projects & Real-World Apps</h1>
          <p className="section-subtitle">
            Explore my end-to-end full-stack systems, single-page React applications, and backend RESTful APIs.
          </p>
        </div>

        {/* 1. Large Featured Project (ServiceNest) */}
        {featuredProject && <FeaturedProject project={featuredProject} />}

        {/* 2. Interactive Search & Filters Bar */}
        <div className="projects-filter-toolbar card">
          <div className="search-input-wrap">
            <FaSearch className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by project name, description or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>

          <div className="filter-controls-row">
            {/* Category Selector */}
            <div className="filter-group">
              <label className="filter-label">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Technology Selector */}
            <div className="filter-group">
              <label className="filter-label">Technology:</label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="filter-select"
              >
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="filter-group">
              <label className="filter-label">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="default">Default Order</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="newest">Recently Created</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Filtered Projects Grid */}
        <div style={{ marginTop: '3rem' }}>
          {loading ? (
            <div className="github-state-box">
              <div className="custom-spinner" />
              <p>Loading projects from database...</p>
            </div>
          ) : sortedProjects.length === 0 ? (
            <div className="github-state-box card">
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                No projects matched your search criteria: "<strong>{searchTerm}</strong>"
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedTech('All');
                }}
                className="btn btn-secondary btn-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="projects-grid">
              {sortedProjects.map((project) => (
                <ProjectCard key={project._id || project.slug} project={project} />
              ))}
            </div>
          )}
        </div>

        {/* 4. GitHub API Integration */}
        <GithubRepos />
      </div>
    </div>
  );
};

export default ProjectsPage;
