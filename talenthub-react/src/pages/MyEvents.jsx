import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TALENTS, SKILLS } from '../data/mockData';
import { apiService } from '../api/apiService';

const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiService.getMyEvents();
        setEvents(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Could not load events. Please ensure the backend is running (npm run backend).');
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', date: '', location: '', category: 'Corporate Event', budget: '', neededSkills: []
  });

  const getSmartMatches = (event) => {
    const totalMax = event.budget;
    const skills = event.skills;
    if (skills.length === 0) return [];

    let currentSum = 0;
    const matches = [];

    // Find best fit for each skill
    skills.forEach(skill => {
      const bestFit = MOCK_TALENTS.filter(t => t.skills.includes(skill))
        .sort((a, b) => b.rating - a.rating)[0];
      
      if (bestFit) {
        const rate = parseInt(bestFit.hourlyRate.replace(/[^0-9]/g, ''));
        if (currentSum + rate <= totalMax || matches.length === 0) {
          matches.push(bestFit);
          currentSum += rate;
        }
      }
    });

    return matches;
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const newEv = {
      ...formData,
      status: 'Active',
      hired: [],
      skills: formData.neededSkills,
      budget: parseFloat(formData.budget)
    };

    try {
      const savedEvent = await apiService.createMyEvent(newEv);
      setEvents([savedEvent, ...events]);
      setIsModalOpen(false);
      setFormData({ title: '', date: '', location: '', category: 'Corporate Event', budget: '', neededSkills: [] });
    } catch (err) {
      alert('Error creating event. Is the backend running?');
    }
  };

  return (
    <div className="me-page">
      <div className="container-box">
        {/* Command Center Header */}
        <div className="me-header">
          <div>
            <h1>My Events Command Center</h1>
            <p>Strategize and hire top talent for your upcoming showcases</p>
          </div>
          <button className="me-add-btn" onClick={() => setIsModalOpen(true)}>
            <span>+</span> Add New Event
          </button>
        </div>

        {/* Section: Active & Recruiting */}
        <div className="me-section">
          <div className="me-section-title">
            <div className="me-bullet">📅</div>
            Active & Recruiting Events
          </div>

          <div className="me-events-grid">
            {events.filter(e => e.status === 'Active').map(event => {
              const isExpanded = expandedEventId === event.id;
              const matches = isExpanded ? getSmartMatches(event) : [];

              return (
                <div key={event.id} className="me-event-card">
                  <div className="me-ev-header">
                    <h3>{event.title}</h3>
                    <div className="me-ev-status">Active</div>
                  </div>

                  <div className="me-ev-meta-row">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location || 'New York, NY'}</span>
                  </div>

                  <div className="me-budget-row">
                    <label>Max Budget</label>
                    <div className="me-budget-val">${event.budget}/hr</div>
                  </div>

                  <div className="me-resources-label">Required Resources</div>
                  <div className="me-skills-row">
                    {event.skills.map(skill => (
                      <span key={skill} className="me-skill-pill">{skill}</span>
                    ))}
                  </div>

                  {!isExpanded ? (
                    <button className="me-find-btn" onClick={() => setExpandedEventId(event.id)}>
                      ⚡ Find Matched Resources
                    </button>
                  ) : (
                    <div className="me-match-section">
                      <div className="me-match-header">
                        <span>AI Smart Matches Found</span>
                        <div style={{ color: '#F43F5E' }}> ✨</div>
                      </div>

                      <div className="me-match-list">
                        {matches.map(talent => (
                          <div key={talent.id} className="me-rec-card">
                            <div className="me-rec-avatar">{talent.image}</div>
                            <div className="me-rec-info">
                              <h4>{talent.name}</h4>
                              <p>{talent.role}</p>
                            </div>
                            <div className="me-rec-price">{talent.hourlyRate}</div>
                            <button className="me-invite-btn" onClick={() => alert(`Invite sent to ${talent.name}!`)}>
                              Invite
                            </button>
                          </div>
                        ))}
                      </div>

                      <button className="me-collapse-btn" onClick={() => setExpandedEventId(null)}>
                        Hide Recommendations
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Overlay for Add Event (Simplified for brevity) */}
        {isModalOpen && (
          <div className="me-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="me-modal-content" onClick={e => e.stopPropagation()}>
              <div className="me-modal-header">
                <h2>Create New Event</h2>
                <button className="me-close-btn" onClick={() => setIsModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleCreateEvent}>
                <div className="me-form-row">
                  <div className="me-input-group">
                    <label>Event Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="me-input-group">
                    <label>Location</label>
                    <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
                <div className="me-form-row" style={{ marginTop: '20px' }}>
                  <div className="me-input-group">
                    <label>Max Hourly Budget ($)</label>
                    <input type="number" required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} />
                  </div>
                  <div className="me-input-group">
                    <label>Date</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
                <div className="me-input-group" style={{ marginTop: '20px' }}>
                    <label>Required Skills (Comma separated)</label>
                    <input placeholder="DJ, Musician, MC/Host" onChange={e => setFormData({...formData, neededSkills: e.target.value.split(',').map(s => s.trim())})} />
                </div>
                <div className="me-modal-footer">
                  <button type="submit" className="me-add-btn" style={{ width: '100%', marginTop: '30px' }}>Publish to Command Center</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
