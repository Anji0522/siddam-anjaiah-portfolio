import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import './LuxuryFooter.css';

const LuxuryFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="luxury-footer">
      <div className="container">
        {/* Top Big Statement */}
        <div className="footer-hero-strip">
          <div className="footer-statement-wrap">
            <span className="footer-tag">SIDDAM ANJAIAH • 2026</span>
            <h2 className="footer-big-title">
              DESIGNED TO INSPIRE. <br />
              <span className="gold-text">ENGINEERED TO SCALE.</span>
            </h2>
          </div>

          <button onClick={scrollToTop} className="back-to-top-btn" title="Return to Top">
            <ArrowUp size={18} />
            <span>TOP</span>
          </button>
        </div>

        <div className="hairline-divider" style={{ margin: '3rem 0' }}></div>

        {/* Bottom Metadata & Copyright */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            <p className="copyright-text">
              © {new Date().getFullYear()} SIDDAM ANJAIAH. ALL RIGHTS RESERVED.
            </p>
            <p className="copyright-sub">
              React & Full-Stack Developer • Mancherial, Telangana, India
            </p>
          </div>

          <div className="footer-social-links">
            <a
              href="https://github.com/Anji0522"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-a"
            >
              <FaGithub size={16} />
              <span>GITHUB</span>
            </a>
            <a
              href="https://www.linkedin.com/in/siddam-anjaiah"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-a"
            >
              <FaLinkedin size={16} />
              <span>LINKEDIN</span>
            </a>
            <a href="mailto:anjisiddam01@gmail.com" className="footer-social-a">
              <Mail size={16} />
              <span>EMAIL</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
