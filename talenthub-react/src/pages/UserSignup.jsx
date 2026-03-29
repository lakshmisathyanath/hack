import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';
import '../styles/registration.css';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', username: '', password: ''
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiService.registerUser({
        ...formData,
        role: 'User',
        timestamp: new Date().toISOString()
      });
      alert("User Account Created Successfully!");
      navigate('/dashboard');
    } catch (err) {
      alert("Error creating account. Is the backend running?");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-hero">
        <div className="icon-box user">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        <h1 className="user">Create Your User Account</h1>
        <p>Join the community and start organizing events</p>
      </div>

      <div className="registration-card" style={{ maxWidth: '900px' }}>
        <form onSubmit={handleCreate}>
          <div className="section-header">
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
                placeholder="1234567890" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-col">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="johndoe" 
                required 
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div className="section-header" style={{ marginTop: '48px' }}>
            <h2>Security</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="registration-actions" style={{ justifyContent: 'center', marginTop: '60px' }}>
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-save-gradient" style={{ flex: 1, justifyContent: 'center' }}>
               <span>🚀 Create Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
