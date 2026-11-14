import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Code2, Sparkles, Layers, Eye } from 'lucide-react';
import './LuxuryHero.css';

const LuxuryHero = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic text reveal
      gsap.from('.hero-word-reveal', {
        y: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from('.hero-fade-in', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    const workSec = document.querySelector('#work');
    if (workSec) {
      workSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="luxury-hero" id="hero" ref={heroRef}>
      {/* Background radial glow */}
      <div className="hero-glow-center" />
      <div className="hero-grid-lines" />

      <div className="container hero-inner">
        {/* Top Tagline */}
        <div className="hero-top-meta hero-fade-in">
          <div className="meta-badge">
            <span className="meta-dot"></span>
            <span className="meta-text">PORTFOLIO '26 — SIDDAM ANJAIAH</span>
          </div>
          <span className="meta-role">REACT & FULL-STACK WEB DEVELOPER</span>
        </div>

        {/* Oversized Cinematic Headline */}
        <div className="hero-main-heading-wrap" ref={headlineRef}>
          <div className="hero-line-overflow">
            <h1 className="hero-headline hero-word-reveal">
              CREATIVE
            </h1>
          </div>
          <div className="hero-line-overflow">
            <h1 className="hero-headline gold-text hero-word-reveal">
              DEVELOPER
            </h1>
          </div>
        </div>

        {/* Subtitle & Impact Statement */}
        <div className="hero-subline-row hero-fade-in" ref={sublineRef}>
          <p className="hero-subtitle">
            Building Digital Experiences That Make an Impact.
          </p>
          <p className="hero-desc">
            Crafting luxury, high-performance web applications with precision architecture, fluid animations, and production-tested full-stack engineering.
          </p>
        </div>

        {/* Pillars Strip: Visuals / Code / Experience */}
        <div className="hero-pillars-grid hero-fade-in">
          <div className="pillar-item">
            <div className="pillar-icon-box">
              <Eye size={18} />
            </div>
            <div className="pillar-info">
              <span className="pillar-num">01</span>
              <h4 className="pillar-title">VISUALS</h4>
              <p className="pillar-desc">Editorial typography, luxury dark aesthetics & pixel-perfect UI.</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <Code2 size={18} />
            </div>
            <div className="pillar-info">
              <span className="pillar-num">02</span>
              <h4 className="pillar-title">CODE</h4>
              <p className="pillar-desc">React 18+, Node.js, Express, PostgreSQL, MongoDB, SQLite & REST APIs.</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <Sparkles size={18} />
            </div>
            <div className="pillar-info">
              <span className="pillar-num">03</span>
              <h4 className="pillar-title">EXPERIENCE</h4>
              <p className="pillar-desc">Fluid micro-interactions, GSAP motion, accessible and test-ready web apps.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Action & Animated Scroll Indicator */}
        <div className="hero-bottom-bar hero-fade-in">
          <div className="hero-cta-group">
            <a href="#work" className="btn-luxury-primary" onClick={handleScrollDown}>
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown size={15} />
            </a>
            <a href="#about" className="btn-luxury-outline">
              <span>ABOUT THE DEVELOPER</span>
            </a>
          </div>

          {/* Animated Scroll Indicator */}
          <a href="#work" className="scroll-indicator" onClick={handleScrollDown}>
            <span className="scroll-label">SCROLL TO DISCOVER</span>
            <div className="scroll-mouse-wire">
              <span className="scroll-wheel"></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LuxuryHero;
