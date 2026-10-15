import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaSyncAlt,
  FaFolder,
  FaClock,
  FaCheckCircle,
  FaTrashAlt,
  FaPlusCircle,
  FaTimes,
  FaGlobe
} from 'react-icons/fa';
import { useGithubLiveSync } from '../../hooks/useGithubLiveSync';
import { formatRelativeTime } from '../../services/github';
import './Projects.css';

const GithubRepos = () => {
  const { repos, loading, isSyncing, error, lastSync, diff, syncNow } = useGithubLiveSync(60000);
  const [dismissedAlert, setDismissedAlert] = useState(false);

  // Map known demo URLs if repo name matches
  const getDemoUrl = (repo) => {
    if (repo.homepage) return repo.homepage;
    const name = repo.name.toLowerCase();
    if (name === 'servicenest') return 'https://anji0522.github.io/ServiceNest/';
    if (name === 'bookhub') return 'https://anji0522.github.io/bookhub/';
    if (name === 'jobbyapp') return 'https://anji0522.github.io/JobbyApp/';
    if (name === 'nxtwatch') return 'https://nxtwatch-anjisiddam01.surge.sh/';
    if (name === 'siddam-anjaiah-portfolio') return 'https://anji0522.github.io/siddam-anjaiah-portfolio/';
    return null;
  };

  const isRecent = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays <= 14;
  };

  return (
    <div className="github-integration-section">
      {/* Live Sync Top Bar */}
      <div className="github-live-sync-banner">
        <div className="live-sync-status-indicator">
          <span className="live-pulse-dot" />
          <span className="live-sync-text">Live GitHub Synchronization: Active</span>
          <span className="live-sync-meta">
            • Auto-syncs every 60s & on tab focus
          </span>
        </div>

        <div className="live-sync-actions">
          {lastSync && (
            <span className="last-sync-time">
              <FaClock size={11} />
              <span>Checked {formatRelativeTime(lastSync)}</span>
            </span>
          )}

          <button
            onClick={() => {
              setDismissedAlert(false);
              syncNow();
            }}
            className="btn btn-sm btn-secondary sync-btn"
            disabled={isSyncing}
            title="Force refresh live repositories from GitHub"
          >
            <FaSyncAlt size={12} className={isSyncing ? 'spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="github-header-row">
        <div>
          <h3 className="github-section-title">
            <FaGithub size={24} />
            <span>Live GitHub Repositories</span>
            <span className="repo-count-pill">{repos.length} Repositories</span>
          </h3>
          <p className="github-section-subtitle">
            Directly connected to{' '}
            <a
              href="https://github.com/Anji0522"
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-link"
            >
              github.com/Anji0522
            </a>
            . Any added, updated, or deleted repositories on GitHub are automatically detected and reflected here in real time.
          </p>
        </div>
      </div>

      {/* Detected Changes Alert (e.g. Added or Deleted Repositories) */}
      <AnimatePresence>
        {!dismissedAlert && diff.hasChanges && (
          <motion.div
            className="github-diff-alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="diff-alert-content">
              {diff.added.length > 0 && (
                <div className="diff-item added">
                  <FaPlusCircle className="diff-icon" size={15} />
                  <span>
                    <strong>New repository detected:</strong>{' '}
                    {diff.added.map((r) => r.name).join(', ')} has been added to your portfolio!
                  </span>
                </div>
              )}

              {diff.removed.length > 0 && (
                <div className="diff-item removed">
                  <FaTrashAlt className="diff-icon" size={15} />
                  <span>
                    <strong>Repository removed:</strong>{' '}
                    {diff.removed.map((r) => r.name).join(', ')} was deleted from GitHub and removed from the portfolio.
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setDismissedAlert(true)}
              className="dismiss-diff-btn"
              aria-label="Dismiss notification"
            >
              <FaTimes size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && repos.length === 0 && (
        <div className="github-state-box loading-box">
          <div className="custom-spinner" />
          <p>Connecting to GitHub API for latest account activity...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && repos.length === 0 && (
        <div className="github-state-box error-box">
          <p className="error-msg">{error}</p>
          <button onClick={() => syncNow()} className="btn btn-sm btn-primary">
            <FaSyncAlt size={12} />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && repos.length === 0 && (
        <div className="github-state-box empty-box">
          <p>No public repositories found for this GitHub account.</p>
        </div>
      )}

      {/* Repositories Grid */}
      {repos.length > 0 && (
        <div className="github-repos-grid">
          {repos.map((repo) => {
            const demoUrl = getDemoUrl(repo);
            const isNew = isRecent(repo.createdAt);

            return (
              <motion.div
                key={repo.id}
                className="github-repo-card"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div className="repo-card-top">
                  <div className="repo-icon-wrap">
                    <FaFolder className="folder-icon" size={18} />
                    {isNew && <span className="new-repo-badge">✨ Newly Added</span>}
                  </div>

                  <div className="repo-card-actions">
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-action-icon demo-icon"
                        title="Open Live Application"
                        aria-label={`Open demo for ${repo.name}`}
                      >
                        <FaGlobe size={14} />
                      </a>
                    )}
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-action-icon"
                      title="Open GitHub Repository"
                      aria-label={`Open repository ${repo.name}`}
                    >
                      <FaExternalLinkAlt size={13} />
                    </a>
                  </div>
                </div>

                <h4 className="repo-name">
                  <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>

                <p className="repo-desc">{repo.description}</p>

                <div className="repo-meta-row">
                  <div className="repo-meta-left">
                    {repo.language && (
                      <span className="repo-lang">
                        <span className="lang-circle" />
                        <span>{repo.language}</span>
                      </span>
                    )}

                    <span className="repo-updated-time">
                      Updated {formatRelativeTime(repo.pushedAt || repo.updatedAt)}
                    </span>
                  </div>

                  <div className="repo-stats">
                    <span className="stat-pill" title="GitHub Stars">
                      <FaStar size={12} />
                      <span>{repo.stars || 0}</span>
                    </span>
                    <span className="stat-pill" title="Forks">
                      <FaCodeBranch size={12} />
                      <span>{repo.forks || 0}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GithubRepos;
