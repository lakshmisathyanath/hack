import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [talent, setTalent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const data = await apiService.getTalentById(id);
        setTalent(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch talent:', err);
        setIsLoading(false);
      }
    };
    fetchTalent();
  }, [id]);

  const handleHire = async () => {
    try {
      await apiService.createBooking({
        talentId: talent.id,
        talentName: talent.name,
        userId: '1',
        status: 'Pending',
        timestamp: new Date().toISOString()
      });
      alert(`🎉 Inquiry sent to ${talent.name}! They will contact you shortly.`);
    } catch (err) {
      alert('Failed to send inquiry. Is the backend running?');
    }
  };

  if (isLoading) return <div className="det-page"><div className="container-box">Loading...</div></div>;

  if (!talent) {
    return (
      <div className="det-page">
        <div className="container-box">
          <button className="det-back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <div className="det-not-found">Talent not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="det-page">
      <div className="container-box">
        {/* Back Button */}
        <button className="det-back-btn" onClick={() => navigate('/dashboard')}>
          <span className="det-back-icon">⬅️</span> Back to Dashboard
        </button>

        <div className="det-layout">
          {/* LEFT CONTENT */}
          <div className="det-main-content">
            {/* Profile Hero */}
            <div className="det-hero-card">
              <div className="det-avatar-wrapper">
                <div className="det-avatar">{talent.image}</div>
                {talent.verified && <div className="det-verified-badge">✅ Verified</div>}
              </div>
              <div className="det-hero-info">
                <h1>{talent.name}</h1>
                <p className="det-role">{talent.role}</p>
                <div className="det-stats-bar">
                  <div className="det-stat">
                    <span className="det-stat-icon">⭐</span>
                    <strong>{talent.rating}</strong>
                    <span className="det-stat-label">Rating</span>
                  </div>
                  <div className="det-stat">
                    <span className="det-stat-icon">👤</span>
                    <strong>{talent.reviews}</strong>
                    <span className="det-stat-label">Events</span>
                  </div>
                  <div className="det-stat">
                    <span className="det-stat-icon">📍</span>
                    <strong>{talent.location}</strong>
                    <span className="det-stat-label">Location</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="det-section">
              <div className="det-section-header">
                <span className="det-section-icon">👤</span>
                <h2>About {talent.name}</h2>
              </div>
              <p className="det-bio">{talent.bio}</p>
            </div>

            {/* Skills Section */}
            <div className="det-section">
              <div className="det-section-header">
                <span className="det-section-icon">🪄</span>
                <h2>Skills & Expertise</h2>
              </div>
              <div className="det-skills-grid">
                {talent.skills.map(skill => (
                  <span key={skill} className="det-skill-pill">{skill}</span>
                ))}
              </div>
            </div>

            {/* Portfolio / Gallery */}
            <div className="det-section">
              <div className="det-section-header">
                <span className="det-section-icon">🎬</span>
                <h2>Portfolio Showcase</h2>
              </div>
              <div className="det-portfolio-grid">
                {talent.gallery.map((item, idx) => (
                  <div key={idx} className="det-portfolio-item">
                    <div className="det-portfolio-icon">{item}</div>
                    <div className="det-portfolio-overlay">View Content</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="det-section">
              <div className="det-section-header">
                <span className="det-section-icon">💬</span>
                <h2>Recent Reviews</h2>
              </div>
              <div className="det-testimonials-list">
                {talent.testimonials.map((t, idx) => (
                  <div key={idx} className="det-testimonial-card">
                    <div className="det-test-header">
                      <div className="det-test-user">
                        <strong>{t.user}</strong>
                        <span className="det-test-badge">Verified Client</span>
                      </div>
                      <div className="det-test-rating">⭐ {t.rating}.0</div>
                    </div>
                    <p>"{t.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (Sticky) */}
          <div className="det-sidebar">
            <div className="det-booking-card">
              <div className="det-booking-header">
                <div className="det-price-wrap">
                  <span className="det-price-amount">{talent.hourlyRate}</span>
                  <span className="det-price-label">Hourly Rate</span>
                </div>
              </div>
              
              <div className="det-booking-divider"></div>
              
              <div className="det-booking-stats">
                <div className="det-booking-stat-item">
                  <span className="det-b-stat-icon">✅</span>
                  <span>98% Completion Rate</span>
                </div>
                <div className="det-booking-stat-item">
                  <span className="det-b-stat-icon">⚡</span>
                  <span>Fast Response</span>
                </div>
              </div>

              <div className="det-booking-actions">
                <button className="det-hire-btn" onClick={handleHire}>
                  Hire {talent.name.split(' ')[0]} Now
                </button>
                <button 
                  className="det-message-btn" 
                  onClick={() => navigate(`/chat/${talent.id}`)}
                >
                  Send a Message
                </button>
              </div>

              <p className="det-booking-footer">
                🔒 Secure booking through TalentHub
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
