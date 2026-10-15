import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaRedo, FaFolder } from 'react-icons/fa';
import { fetchGithubRepos } from '../../services/github';
import './Projects.css';

const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRepos = async () => {
    setLoading(true);
    setError(null);
    const result = await fetchGithubRepos();

    if (result.success) {
      setRepos(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRepos();
  }, []);

  return (
    <div className="github-integration-section">
      <div className="github-header-row">
        <div>
          <h3 className="github-section-title">
            <FaGithub size={24} />
            <span>Latest GitHub Repositories</span>
          </h3>
          <p className="github-section-subtitle">
            Synchronized directly from public profile{' '}
            <a
              href="https://github.com/Anji0522"
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-link"
            >
              @Anji0522
            </a>
          </p>
        </div>

        <button
          onClick={loadRepos}
          className="btn btn-sm btn-secondary refresh-btn"
          disabled={loading}
          title="Refresh GitHub Repositories"
        >
          <FaRedo size={12} className={loading ? 'spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="github-state-box loading-box">
          <div className="custom-spinner" />
          <p>Fetching repositories from GitHub API...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="github-state-box error-box">
          <p className="error-msg">Notice: {error}</p>
          <button onClick={loadRepos} className="btn btn-sm btn-primary">
            <FaRedo size={12} />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && repos.length === 0 && (
        <div className="github-state-box empty-box">
          <p>No public repositories found on GitHub profile.</p>
        </div>
      )}

      {/* Repositories Grid */}
      {!loading && !error && repos.length > 0 && (
        <div className="github-repos-grid">
          {repos.slice(0, 6).map((repo) => (
            <div key={repo.id} className="github-repo-card">
              <div className="repo-card-top">
                <FaFolder className="folder-icon" size={20} />
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-external-link"
                  aria-label={`Open repository ${repo.name}`}
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              </div>

              <h4 className="repo-name">
                <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-meta-row">
                {repo.language && (
                  <span className="repo-lang">
                    <span className="lang-circle" />
                    <span>{repo.language}</span>
                  </span>
                )}

                <div className="repo-stats">
                  <span className="stat-pill" title="Stars">
                    <FaStar size={12} />
                    <span>{repo.stars || 0}</span>
                  </span>
                  <span className="stat-pill" title="Forks">
                    <FaCodeBranch size={12} />
                    <span>{repo.forks || 0}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GithubRepos;
