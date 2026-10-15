import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="container section-padding" style={{ textAlign: 'center', minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <FaExclamationTriangle size={32} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Page Not Found</h2>
      <p style={{ maxWidth: '450px', margin: '0 auto 2rem auto', color: 'var(--text-secondary)' }}>
        The route you are trying to visit does not exist or has been relocated.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <FaHome size={16} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
