import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';

const TalentProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulating logged-in user (Alex Thompson, ID 1)
        const data = await apiService.getTalentById('1');
        setProfile(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) return <div className="tp-page">Loading...</div>;
  if (!profile) return <div className="tp-page">Profile not found.</div>;

  const initials = profile.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="tp-page">
      {/* Back to Dashboard */}
      <button className="tp-back-btn" onClick={() => navigate('/dashboard')}>
        <span style={{fontSize: '18px'}}>⬅️</span> Back to Dashboard
      </button>

      {/* Hero Card */}
      <div className="tp-hero-card">
        <div className="tp-avatar">{initials}</div>
        <div className="tp-hero-info">
          <h1>{profile.name}</h1>
          <p className="tp-subtitle">{profile.role}</p>
          <div className="tp-badges">
            <span className="tp-badge verified">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Verified Talent
            </span>
            <span className="tp-badge logout" onClick={onLogout}>
              <span style={{fontSize: '16px'}}>🚪</span> Logout
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Body */}
      <div className="tp-body-grid">
        {/* LEFT COLUMN */}
        <div className="tp-left-col">
          {/* Personal Information */}
          <div className="tp-card">
            <div className="tp-card-title">
              <span style={{color: '#6366F1', fontSize: '20px'}}>👤</span>
              Personal Information
            </div>
            <div className="tp-info-grid">
              <div className="tp-info-item">
                <span className="tp-info-label">FULL NAME</span>
                <span className="tp-info-value">{profile.name}</span>
              </div>
              <div className="tp-info-item">
                <span className="tp-info-label">EMAIL ADDRESS</span>
                <span className="tp-info-value">{profile.email || 'alex.thompson@example.com'}</span>
              </div>
              <div className="tp-info-item">
                <span className="tp-info-label">PHONE NUMBER</span>
                <span className="tp-info-value">+1 (555) 123-4567</span>
              </div>
              <div className="tp-info-item">
                <span className="tp-info-label">LOCATION</span>
                <span className="tp-info-value">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="tp-card">
            <div className="tp-card-title">
              <span style={{color: '#8B4513', fontSize: '20px'}}>💼</span>
              Professional Details
            </div>
            <div className="tp-info-item" style={{ marginBottom: '24px' }}>
              <span className="tp-info-label">YEARS OF EXPERIENCE</span>
              <span className="tp-info-value">5+ years</span>
            </div>
            <div className="tp-info-item" style={{ marginBottom: '32px' }}>
              <span className="tp-info-label">BIO</span>
              <p className="tp-bio-text">
                {profile.bio}
              </p>
            </div>
            <div className="tp-info-item">
              <span className="tp-info-label">MY SKILLS</span>
              <div className="tp-skills-row">
                {profile.skills.map(s => (
                  <span key={s} className="tp-skill-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="tp-right-col">
          {/* Verification Video */}
          <div className="tp-video-card">
            <div className="tp-video-play">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="tp-video-name">Verification reel.mp4</p>
            <p className="tp-video-date">Uploaded on March 28, 2026</p>
          </div>

          {/* Profile Stats */}
          <div className="tp-card">
            <div className="tp-card-title">
              <span style={{fontSize: '20px'}}>📊</span>
              Profile Stats
            </div>
            <div className="tp-stat-row">
              <span className="tp-stat-label">Rating</span>
              <span className="tp-stat-value gold">⭐ 4.9 (24 Reviews)</span>
            </div>
            <div className="tp-stat-row">
              <span className="tp-stat-label">Completion Rate</span>
              <span className="tp-stat-value green">98%</span>
            </div>
            <div className="tp-stat-row">
              <span className="tp-stat-label">Avg. Response</span>
              <span className="tp-stat-value blue">&lt; 2 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
