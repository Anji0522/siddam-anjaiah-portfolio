import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { FaUserShield, FaLock, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.adminLogin({ email, password });
      if (res.success && res.token) {
        login(res.token, res.admin);
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid administrative credentials.');
      }
    } catch (err) {
      setError('Connection error occurred while contacting authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page section-padding">
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <FaUserShield size={28} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Admin Portal Login</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              Restricted management portal for Siddam Anjaiah
            </p>
          </div>

          {error && (
            <div className="form-alert-box alert-error" style={{ marginBottom: '1.5rem' }}>
              <FaExclamationCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="contact-form">
            <div className="form-group">
              <label className="form-label" htmlFor="admin-email">
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  id="admin-email"
                  className="form-input"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="admin-password"
                  className="form-input"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg submit-btn"
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'Authenticating...' : 'Sign In as Administrator'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
