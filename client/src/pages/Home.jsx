import React from 'react';
import LuxuryNavbar from '../components/Navbar/LuxuryNavbar';
import LuxuryHero from '../components/Hero/LuxuryHero';
import LuxuryAbout from '../components/About/LuxuryAbout';
import LuxuryProjects from '../components/Projects/LuxuryProjects';
import LuxuryJournal from '../components/Interests/LuxuryJournal';
import LuxuryExpertise from '../components/Skills/LuxuryExpertise';
import LuxuryContact from '../components/Contact/LuxuryContact';
import LuxuryFooter from '../components/Footer/LuxuryFooter';

const Home = () => {
  return (
    <div className="luxury-portfolio-root">
      {/* Ambient background glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* 1. Navigation Menu */}
      <LuxuryNavbar />

      {/* 2. Hero Landing Page */}
      <LuxuryHero />

      {/* 3. Selected Work / Projects */}
      <LuxuryProjects />

      {/* 4. About Me */}
      <LuxuryAbout />

      {/* 5. Journal / Evolution Timeline */}
      <LuxuryJournal />

      {/* 6. Expertise / Technical Skills */}
      <LuxuryExpertise />

      {/* 7. Contact Section */}
      <LuxuryContact />

      {/* 8. Luxury Footer */}
      <LuxuryFooter />
    </div>
  );
};

export default Home;
