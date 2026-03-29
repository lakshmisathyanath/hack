import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS } from '../data/mockData';
import { apiService } from '../api/apiService';
import '../styles/registration.css';

const TalentSignup = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState(new Set());
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', experience: '', bio: ''
  });
  
  const toggleSkill = (skill) => {
    const newSkills = new Set(selectedSkills);
    if (newSkills.has(skill)) {
      newSkills.delete(skill);
    } else {
      newSkills.add(skill);
    }
    setSelectedSkills(newSkills);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedSkills.size === 0) {
       alert("Please select at least one skill!");
       return;
    }
    
    try {
      await apiService.registerUser({
        ...formData,
        skills: Array.from(selectedSkills),
        role: 'Talent',
        timestamp: new Date().toISOString()
      });
      alert("Profile Created Successfully!");
      navigate('/dashboard');
    } catch (err) {
      alert("Error saving profile. Is the backend running?");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-hero">
        <div className="icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <h1>Create Your Talent Profile</h1>
        <p>Showcase your skills and get hired for amazing events</p>
      </div>

      <div className="registration-card">
        <form onSubmit={handleSave}>
          {/* Section 1: Personal Information */}
          <div className="section-header">
            <svg width="20" height="20" className="icon-violet" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <h2>Personal Information</h2>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-col">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="+1 (555) 123-4567" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-col">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="New York, NY" 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          {/* Section 2: Professional Details */}
          <div className="section-header">
            <svg width="20" height="20" className="icon-violet" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
            </svg>
            <h2>Professional Details</h2>
          </div>

          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Years of Experience</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., 5+ years" 
              value={formData.experience}
              onChange={e => setFormData({...formData, experience: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Skills (Select all that apply)</label>
            <div className="skills-container">
              {SKILLS.map(skill => (
                <div 
                  key={skill} 
                  className={`skill-chip ${selectedSkills.has(skill) ? 'active' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="section-header">
             <svg width="20" height="20" className="icon-violet" viewBox="0 0 24 24" fill="currentColor">
               <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
             </svg>
             <h2>About You</h2>
          </div>
          <div className="form-group">
             <textarea 
               className="form-input" 
               style={{ height: '120px', resize: 'none' }} 
               placeholder="Tell event organizers about yourself..."
               value={formData.bio}
               onChange={e => setFormData({...formData, bio: e.target.value})}
             ></textarea>
          </div>

          {/* Section 3: Verification Video */}
          <div className="section-header">
            <svg width="20" height="20" className="icon-violet" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            <h2>Verification Video</h2>
          </div>

          <div className="video-dropzone">
             <svg width="48" height="48" className="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
             </svg>
             <p>Drag and drop a video file here or click to upload</p>
          </div>

          <div className="registration-actions">
             <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
             <button type="submit" className="btn-save-gradient">
                <span>🪄 Save Profile</span>
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TalentSignup;
