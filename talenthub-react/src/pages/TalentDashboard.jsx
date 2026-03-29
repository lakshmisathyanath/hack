import React, { useState, useEffect } from 'react';
import { apiService } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const CATEGORY_COLORS = {
  "Music & Concert": "#EEF2FF",
  "Corporate Event": "#EFF6FF",
  "Art Exhibition": "#F5F3FF",
  "Wedding": "#FFF1F2",
  "Culinary Event": "#ECFDF5",
  "Party & Celebration": "#FFF7ED",
  "Film & Media": "#F0FDF4",
};

const CATEGORY_TEXT_COLORS = {
  "Music & Concert": "#4F46E5",
  "Corporate Event": "#2563EB",
  "Art Exhibition": "#7C3AED",
  "Wedding": "#E11D48",
  "Culinary Event": "#059669",
  "Party & Celebration": "#EA580C",
  "Film & Media": "#16A34A",
};

const TalentDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ quote: '0.00', coverNote: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqData, evData] = await Promise.all([
          apiService.getRequests(),
          apiService.getEvents()
        ]);
        setRequests(reqData);
        setEvents(evData);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAccept = (id) => {
    const req = requests.find(r => r.id === id);
    alert(`✅ You accepted "${req.title}" from ${req.organizer}!`);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleNegotiate = (id) => {
    const req = requests.find(r => r.id === id);
    const counter = window.prompt(`Counter-offer for "${req.title}" (current: ${req.budget}):`);
    if (counter) {
      alert(`Your counter-offer of ${counter} has been sent to ${req.organizer}!`);
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleDecline = (id) => {
    if (window.confirm("Are you sure you want to decline this invitation?")) {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleApplyClick = (event) => {
    setSelectedEvent(event);
    setIsApplyModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.submitApplication({
        eventId: selectedEvent.id,
        talentId: 1, // Assume Alex Thompson
        quote: formData.quote,
        coverNote: formData.coverNote,
        timestamp: new Date().toISOString()
      });
      alert(`🚀 Application sent successfully for ${selectedEvent.title}!`);
      setIsApplyModalOpen(false);
      setFormData({ quote: '0.00', coverNote: '' });
    } catch (err) {
      alert('Failed to submit application. Is the backend running?');
    }
  };

  return (
    <div className="td-page">
      {/* Application Modal */}
      {isApplyModalOpen && selectedEvent && (
        <div className="td-modal-overlay" onClick={() => setIsApplyModalOpen(false)}>
          <div className="td-modal-content" onClick={e => e.stopPropagation()}>
            <h2>Submit Application</h2>
            <p className="td-modal-subtitle">Applying for: <strong>{selectedEvent.title}</strong></p>
            
            <form onSubmit={handleFormSubmit}>
              <div className="td-form-group">
                <label className="td-form-label">Your Quote ($)</label>
                <div className="td-quote-input-wrap">
                  <input 
                    type="text" 
                    className="td-quote-input"
                    value={formData.quote}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      setFormData({...formData, quote: val});
                    }}
                    autoFocus
                  />
                </div>
              </div>

              <div className="td-form-group">
                <label className="td-form-label">Cover Note</label>
                <textarea 
                  className="td-cover-note"
                  placeholder="Tell the organizer why you are the best fit for this event..."
                  value={formData.coverNote}
                  onChange={e => setFormData({...formData, coverNote: e.target.value})}
                />
              </div>

              <div className="td-modal-actions">
                <button 
                  type="button" 
                  className="td-btn-cancel" 
                  onClick={() => setIsApplyModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="td-btn-send">
                  🚀 Send Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Welcome Header */}
      <div className="td-welcome-bar">
        <div className="td-welcome-left">
          <h1>Welcome back, Alex Thompson! 👋</h1>
          <p>Here are events matching your skills</p>
        </div>
        <div className="td-welcome-right">
          <div className="td-badge verified">✅ Verified Talent</div>
          <div className="td-badge opportunities">🔔 {requests.length} New Opportunities</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="td-stats-grid">
        <div className="td-stat-card">
          <div className="td-stat-info">
            <span>Active Applications</span>
            <h2>5</h2>
          </div>
          <div className="td-stat-icon" style={{ background: '#EEF2FF', color: '#6366F1' }}>📈</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-info">
            <span>Matches Found</span>
            <h2>6</h2>
          </div>
          <div className="td-stat-icon" style={{ background: '#ECFDF5', color: '#10B981' }}>✨</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-info">
            <span>Direct Invitations</span>
            <h2 style={{ color: '#6366F1' }}>{requests.length}</h2>
          </div>
          <div className="td-stat-icon" style={{ background: '#EEF2FF', color: '#6366F1' }}>💌</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-info">
            <span>Profile Views</span>
            <h2>128</h2>
          </div>
          <div className="td-stat-icon" style={{ background: '#FDF2F8', color: '#DB2777' }}>🔔</div>
        </div>
      </div>

      {/* Direct Invitations Carousel */}
      {requests.length > 0 && (
        <div className="td-section">
          <div className="td-section-header">
            <div className="td-section-icon" style={{ background: '#6366F1' }}>💌</div>
            <h2>Direct Invitations</h2>
          </div>
          <div className="td-carousel-wrapper">
            <div className="td-carousel" id="invitationsCarousel">
              {requests.map(req => (
                <div key={req.id} className="td-invitation-card">
                  <div className="td-inv-header">
                    <div>
                      <h3>{req.title}</h3>
                      <p className="td-inv-organizer">from <strong>{req.organizer}</strong></p>
                    </div>
                    <div className="td-inv-budget">{req.budget}</div>
                  </div>
                  <p className="td-inv-message">"{req.message}"</p>
                  <div className="td-inv-meta">
                    <span>📅 {req.date}</span>
                    <span>🎯 Skills: {req.skills.join(', ')}</span>
                  </div>
                  <div className="td-inv-actions">
                    <button className="td-btn-accept" onClick={() => handleAccept(req.id)}>Accept</button>
                    <button className="td-btn-negotiate" onClick={() => handleNegotiate(req.id)}>Negotiate</button>
                    <button className="td-btn-decline" onClick={() => handleDecline(req.id)}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Events Matching Your Skills */}
      <div className="td-section">
        <div className="td-section-header">
          <div className="td-section-icon" style={{ background: '#FF5317' }}>🪄</div>
          <h2>Events Matching Your Skills</h2>
        </div>
        <div className="td-event-grid">
          {events.map(event => (
            <div key={event.id} className="td-event-card">
              <div className="td-event-top">
                <h3>{event.title}</h3>
                <span
                  className="td-category-tag"
                  style={{
                    background: CATEGORY_COLORS[event.category] || '#F8FAFC',
                    color: CATEGORY_TEXT_COLORS[event.category] || '#64748B'
                  }}
                >
                  {event.category}
                </span>
              </div>
              <div className="td-event-meta">
                <div>📅 {event.date}</div>
                <div>📍 {event.location}</div>
                <div>👤 {event.organizer}</div>
              </div>
              <div className="td-skills-label">REQUIRED SKILLS:</div>
              <div className="td-event-skills">
                {event.skills.map(s => (
                  <span key={s} className="td-skill-chip">{s}</span>
                ))}
              </div>
              <div className="td-event-actions">
                <button className="td-btn-view" onClick={() => navigate(`/event/${event.id}`)}>View Details</button>
                <button 
                  className="td-btn-apply" 
                  onClick={() => handleApplyClick(event)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentDashboard;
