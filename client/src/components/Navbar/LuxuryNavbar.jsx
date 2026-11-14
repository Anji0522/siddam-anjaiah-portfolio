import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import './LuxuryNavbar.css';

const navLinks = [
  { name: 'WORK', href: '#work' },
  { name: 'ABOUT', href: '#about' },
  { name: 'JOURNAL', href: '#journal' },
  { name: 'EXPERTISE', href: '#expertise' },
  { name: 'CONTACT', href: '#contact' }
];

const LuxuryNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`luxury-nav-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="luxury-nav-container">
        {/* Brand / Name Logo */}
        <a href="#hero" className="luxury-logo" onClick={(e) => handleScrollTo(e, '#hero')}>
          <span className="logo-initials">SA</span>
          <span className="logo-name-full">
            SIDDAM ANJAIAH <span className="logo-dot">/</span> <span className="logo-sub">CREATIVE DEV</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="luxury-nav-links">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="luxury-nav-item"
              onClick={(e) => handleScrollTo(e, item.href)}
            >
              <span className="nav-index">0{idx + 1}</span>
              <span className="nav-text">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Action Button: Available for Hire / Resume */}
        <div className="luxury-nav-actions">
          <a
            href="/assets/Siddam_Anjaiah_React_Frontend_Resume.pdf"
            download="Siddam_Anjaiah_React_Frontend_Resume.pdf"
            className="luxury-nav-cta"
            title="Download Official Resume"
          >
            <span className="status-live-dot"></span>
            <span>RESUME</span>
            <ArrowUpRight size={14} className="cta-arrow" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="luxury-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-links">
              {navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="mobile-drawer-link"
                  onClick={(e) => handleScrollTo(e, item.href)}
                >
                  <span className="mobile-idx">0{idx + 1}</span>
                  <span className="mobile-name">{item.name}</span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <a
                href="/assets/Siddam_Anjaiah_React_Frontend_Resume.pdf"
                download="Siddam_Anjaiah_React_Frontend_Resume.pdf"
                className="btn-luxury-primary"
                style={{ width: '100%' }}
              >
                <Download size={15} />
                <span>Download Official CV</span>
              </a>
              <div className="mobile-socials">
                <a href="https://github.com/Anji0522" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={18} />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/siddam-anjaiah" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default LuxuryNavbar;
