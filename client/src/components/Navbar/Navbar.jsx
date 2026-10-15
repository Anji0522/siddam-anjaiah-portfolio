import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  FaGithub,
  FaLinkedin,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUserShield,
  FaFileAlt
} from 'react-icons/fa';
import './Navbar.css';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Projects', path: '/projects' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Education', path: '/education' },
  { name: 'Interests', path: '/interests' },
  { name: 'Contact', path: '/contact' },
  { name: 'Resume', path: '/resume' }
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" aria-label="Siddam Anjaiah Portfolio Home">
          <span className="logo-badge">SA</span>
          <span className="logo-text">
            Siddam <span className="logo-highlight">Anjaiah</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  className="nav-indicator"
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Socials, Theme Toggle, Admin */}
        <div className="navbar-actions">
          <a
            href="https://github.com/Anji0522"
            target="_blank"
            rel="noopener noreferrer"
            className="action-icon-btn"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <FaGithub size={19} />
          </a>

          <a
            href="https://www.linkedin.com/in/siddam-anjaiah/"
            target="_blank"
            rel="noopener noreferrer"
            className="action-icon-btn"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <FaLinkedin size={19} />
          </a>

          <button
            onClick={toggleTheme}
            className="action-icon-btn theme-toggle-btn"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0, scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <FaSun size={19} className="sun-icon" /> : <FaMoon size={19} className="moon-icon" />}
            </motion.div>
          </button>

          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="btn btn-sm btn-primary admin-nav-btn"
              title="Admin Dashboard"
            >
              <FaUserShield size={14} />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="admin-login-link"
              title="Admin Access"
              aria-label="Admin Login"
            >
              <FaUserShield size={16} />
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="mobile-menu-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="mobile-socials-row">
                <a
                  href="https://github.com/Anji0522"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                >
                  <FaGithub size={20} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/siddam-anjaiah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-social-link"
                >
                  <FaLinkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>

              {isAuthenticated ? (
                <Link
                  to="/admin/dashboard"
                  className="btn btn-primary mobile-admin-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUserShield size={16} />
                  <span>Admin Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="mobile-admin-login-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Access
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
