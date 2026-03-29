import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await apiService.getEventById(id);
        setEvent(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (isLoading) return <div className="ed-page"><div className="container-box">Loading...</div></div>;

  if (!event) {
    return (
      <div className="container-box">
        <button className="ed-back-btn" onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </button>
        <div className="ed-not-found">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="ed-page">
      <div className="container-box">
        <button className="ed-back-btn" onClick={() => navigate('/dashboard')}>
           <span className="ed-back-icon">⬅️</span> Back to Dashboard
        </button>

        <div className="ed-hero-card">
          <div className="ed-hero-top-accent"></div>
          <div className="ed-hero-content">
            <div className="ed-category-badge">{event.category}</div>
            <div className="ed-hero-main">
              <h1>{event.title}</h1>
              <button className="ed-apply-btn" onClick={() => alert('Application Sent!')}>
                Apply Now
              </button>
            </div>
            
            <div className="ed-details-row">
              <div className="ed-detail-item">
                <span className="ed-detail-icon">📅</span>
                <div className="ed-detail-text">
                  <label>DATE & TIME</label>
                  <p>{event.date}</p>
                </div>
              </div>
              <div className="ed-detail-item">
                <span className="ed-detail-icon">📍</span>
                <div className="ed-detail-text">
                  <label>LOCATION</label>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="ed-detail-item">
                <span className="ed-detail-icon">👤</span>
                <div className="ed-detail-text">
                  <label>ORGANIZER</label>
                  <p>{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ed-section">
          <div className="ed-section-header">
            <span className="ed-section-icon">📝</span>
            <h2>About the Event</h2>
          </div>
          <p className="ed-description">{event.description}</p>
          <p className="ed-description-extra">
            This is a high-visibility event with over 50,000 attendees expected. 
            Excellent opportunity for exposure and networking.
          </p>
        </div>

        <div className="ed-section">
          <div className="ed-section-header">
            <span className="ed-section-icon ed-lightning">⚡</span>
            <h2>Requirements</h2>
          </div>
          <div className="ed-requirements-grid">
            {event.requirements.map((req, idx) => (
              <div key={idx} className="ed-requirement-item">
                <span className="ed-check-icon">✅</span>
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ed-section">
          <div className="ed-section-header">
            <span className="ed-section-icon ed-target">🎯</span>
            <h2>Target Skills</h2>
          </div>
          <div className="ed-skills-pills">
            {event.skills.map(skill => (
              <span key={skill} className="ed-skill-pill">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
