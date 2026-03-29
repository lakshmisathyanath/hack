import React, { useState, useEffect } from 'react';
import { apiService } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All Types', 'DJ', 'Singer', 'Musician', 'Photographer', 'Dancer', 'Chef'];

const Dashboard = () => {
  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Types');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const data = await apiService.getTalents();
        setTalents(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch talents:', err);
        setIsLoading(false);
      }
    };
    fetchTalents();
  }, []);

  const handleHire = async (talent) => {
    try {
      await apiService.createBooking({
        talentId: talent.id,
        talentName: talent.name,
        userId: '1', // Mock current user
        status: 'Pending',
        timestamp: new Date().toISOString()
      });
      alert(`🎉 Inquiry sent to ${talent.name}! They will contact you shortly.`);
    } catch (err) {
      alert('Failed to send inquiry. Is the backend running?');
    }
  };

  const filteredTalents = talents.filter(talent => {
    const matchesSearch =
      talent.name.toLowerCase().includes(search.toLowerCase()) ||
      talent.role.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location === '' ||
      talent.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory =
      activeCategory === 'All Types' || talent.skills.some(s => s.includes(activeCategory));
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="ud-page">
      {/* Hero */}
      <div className="ud-hero">
        <h1>Find World-Class Talent</h1>
        <p>Hire the best DJs, singers, and entertainers for your next unforgettable event.</p>
        <div className="ud-search-box">
          <div className="ud-search-field">
            <label>Who are you looking for?</label>
            <div className="ud-input-wrap">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search by name or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="ud-search-divider" />
          <div className="ud-search-field">
            <label>Location</label>
            <div className="ud-input-wrap">
              <span>📍</span>
              <input
                type="text"
                placeholder="New York, NY"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>
          <button className="ud-search-btn">Search Now</button>
        </div>
      </div>

      {/* Body: sidebar + cards */}
      <div className="ud-body">
        {/* Sidebar */}
        <aside className="ud-sidebar">
          <p className="ud-sidebar-label">Categories</p>
          {CATEGORIES.map(cat => (
            <div
              key={cat}
              className={`ud-cat-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All Types' && <span>🌟 </span>}
              {cat}
            </div>
          ))}
        </aside>

        {/* Talent Cards Grid */}
        <div className="ud-talent-grid">
          {filteredTalents.length === 0 ? (
            <div className="ud-no-results">
              <p>😕 No talents found. Try a different search or category.</p>
            </div>
          ) : (
            filteredTalents.map(talent => (
              <div key={talent.id} className="ud-talent-card">
                {/* Card Header with Avatar */}
                <div className="ud-card-header">
                  <div className="ud-avatar">
                    {talent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {talent.verified && (
                    <span className="ud-verified-pill">✅ Verified</span>
                  )}
                </div>

                {/* Card Info */}
                <div className="ud-card-body">
                  <h3 className="ud-talent-name">{talent.name}</h3>
                  <p className="ud-talent-role">{talent.role}</p>

                  <div className="ud-rating">
                    ⭐ <strong>{talent.rating}</strong>
                    <span className="ud-review-count">({talent.reviews} reviews)</span>
                  </div>

                  <div className="ud-skill-chips">
                    {talent.skills.map(s => (
                      <span key={s} className="ud-skill-chip">{s}</span>
                    ))}
                  </div>

                  <div className="ud-card-meta">
                    <span>📍 {talent.location}</span>
                    <span className="ud-price-badge">{talent.hourlyRate}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="ud-card-footer">
                  <button
                    className="ud-btn-view"
                    onClick={() => navigate(`/details/${talent.id}`)}
                  >
                    View Profile
                  </button>
                  <button className="ud-btn-hire" onClick={() => handleHire(talent)}>Hire</button>
                  <button
                    className="ud-btn-chat"
                    onClick={() => navigate(`/chat/${talent.id}`)}
                  >
                    💬 Chat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
