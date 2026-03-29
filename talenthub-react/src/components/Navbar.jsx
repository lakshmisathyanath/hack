import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const userName = role === 'talent' ? 'Alex Thompson' : 'John Doe';
  const userInitials = role === 'talent' ? 'AT' : 'JD';
  const avatarGradient = role === 'talent'
    ? 'linear-gradient(135deg, #7C3AED, #A78BFA)'
    : 'linear-gradient(135deg, #4F46E5, #3B82F6)';

  const navLinks = role === 'user'
    ? [
        { label: 'Discover', path: '/dashboard', icon: '🔭' },
        { label: 'Messages', path: '/chat/1', icon: '💬' },
        { label: 'Profile', path: '/profile', icon: '👤' },
      ]
    : [
        { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { label: 'Messages', path: '/chat/1', icon: '💬' },
        { label: 'Profile', path: '/profile', icon: '👤' },
      ];

  const notifications = [
    { id: 1, text: 'New booking request from LuxEvents', time: '2m ago', unread: true },
    { id: 2, text: 'Your profile was viewed 5 times today', time: '1h ago', unread: true },
    { id: 3, text: 'Reminder: Event tomorrow at 8PM', time: '3h ago', unread: false },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="navbar">
      {/* LEFT — Logo */}
      <div className="nav-left">
        <div className="nav-logo" onClick={() => navigate('/dashboard')}>
          <div className="nav-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"/>
            </svg>
          </div>
          <span>{role === 'talent' ? 'TalentHub' : 'UserHub'}</span>
        </div>
      </div>

      {/* CENTER — Nav Links */}
      <div className="nav-center">
        {navLinks.map(link => (
          <div
            key={link.path}
            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            onClick={() => navigate(link.path)}
          >
            <span className="nav-link-icon">{link.icon}</span>
            <span>{link.label}</span>
            {isActive(link.path) && <div className="nav-link-dot" />}
          </div>
        ))}
      </div>

      {/* RIGHT — Notifications + Profile */}
      <div className="nav-right">
        
        {/* My Events Button (User only) */}
        {role === 'user' && (
          <button 
            className={`nav-my-events-btn ${isActive('/my-events') ? 'active' : ''}`}
            onClick={() => navigate('/my-events')}
            title="My Events"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="nav-lbl-desktop">My Events</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="nav-notif-wrap" ref={notifRef}>
          <button
            className={`nav-notif-btn ${notifOpen ? 'open' : ''}`}
            onClick={() => { setNotifOpen(p => !p); setMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            {unreadCount > 0 && <span className="nav-notif-badge">{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className="nav-notif-panel">
              <div className="nav-notif-header">
                <span>Notifications</span>
                <span className="nav-notif-clear">Mark all read</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`nav-notif-item ${n.unread ? 'unread' : ''}`}>
                  <div className="nav-notif-dot" style={{ opacity: n.unread ? 1 : 0 }} />
                  <div>
                    <p className="nav-notif-text">{n.text}</p>
                    <p className="nav-notif-time">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="nav-profile-wrap" ref={menuRef}>
          <div
            className={`nav-profile-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => { setMenuOpen(p => !p); setNotifOpen(false); }}
          >
            <div className="nav-avatar" style={{ background: avatarGradient }}>{userInitials}</div>
            <div className="nav-user-info">
              <span className="nav-user-name">{userName}</span>
              <span className="nav-user-role">{role === 'talent' ? '🎤 Talent' : '👤 User'}</span>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="#94A3B8"
              style={{ transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>

          {menuOpen && (
            <div className="nav-dropdown">
              <div className="nav-dropdown-header">
                <div className="nav-avatar-lg" style={{ background: avatarGradient }}>{userInitials}</div>
                <div>
                  <p className="nav-dd-name">{userName}</p>
                  <p className="nav-dd-role">{role === 'talent' ? '🎤 Verified Talent' : '👤 Event Organizer'}</p>
                </div>
              </div>
              <div className="nav-dropdown-divider" />
              <div className="nav-dropdown-item" onClick={() => { navigate('/profile'); setMenuOpen(false); }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                View Profile
              </div>
              <div className="nav-dropdown-item" onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
                Dashboard
              </div>
              <div className="nav-dropdown-divider" />
              <div className="nav-dropdown-item danger" onClick={() => { onLogout(); setMenuOpen(false); }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
