import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ onLogin }) => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(role);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="login-card">
        <div className="logo-container">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        </div>
        <h1 className="welcome-title">Welcome Back</h1>
        <p className="welcome-subtitle">Discover Local Talent</p>

        <div className="form-group" style={{ textAlign: 'left', marginBottom: '8px' }}>
          <label className="form-label">I am a</label>
        </div>
        <div className={`role-switcher ${role}`}>
          <div className="role-indicator"></div>
          <div
            className={`role-option ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            User
          </div>
          <div
            className={`role-option ${role === 'talent' ? 'active' : ''}`}
            onClick={() => setRole('talent')}
          >
            Talent
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary " >Get Started</button>
        </form>

        <p className="signup-text">
          Don't have an account? <span className="signup-link" onClick={() => navigate(role === 'user' ? '/user/signup' : '/talent/signup')}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
