import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../api/apiService';

const Messenger = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [activeId, setActiveId] = useState(id || '1');
  const [talents, setTalents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState('');

  // Fetch talents for sidebar
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const data = await apiService.getTalents();
        setTalents(data);
      } catch (err) {
        console.error('Failed to fetch talents for messenger:', err);
      }
    };
    fetchTalents();
  }, []);

  // Fetch messages for active conversation
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await apiService.getMessages(activeId);
        setMessages(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [activeId]);

  const activeTalent = talents.find(t => t.id === activeId);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      talentId: activeId,
      type: 'sent',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const savedMsg = await apiService.sendMessage(newMsg);
      setMessages(prev => [...prev, savedMsg]);
      setInput('');
    } catch (err) {
      alert('Failed to send message. Is the backend running?');
    }
  };

  return (
    <div className="msg-page">
      {/* LEFT SIDEBAR */}
      <aside className="msg-sidebar">
        <div className="msg-sidebar-header">
          <h2>Messages</h2>
        </div>
        <div className="msg-contact-list">
          {talents.map(talent => (
            <div
              key={talent.id}
              className={`msg-contact-item ${activeId === talent.id ? 'active' : ''}`}
              onClick={() => { setActiveId(talent.id); navigate(`/chat/${talent.id}`); }}
            >
              <div className="msg-contact-avatar">
                <div className="msg-avatar-circle">{talent.image}</div>
                <div className="msg-online-dot" />
              </div>
              <div className="msg-contact-info">
                <span className="msg-contact-name">{talent.name}</span>
                <span className="msg-contact-status">Online</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT PANEL */}
      <div className="msg-chat-panel">
        {/* Chat Header */}
        <div className="msg-chat-header">
          <div className="msg-chat-header-left">
            <button className="msg-back-btn" onClick={() => navigate('/dashboard')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div className="msg-header-avatar">{activeTalent?.image || '🎤'}</div>
            <div>
              <p className="msg-header-name">{activeTalent?.name}</p>
              <p className="msg-header-status">
                <span className="msg-status-dot" />
                Active Now
              </p>
            </div>
          </div>
          <button className="msg-book-btn">Book Now</button>
        </div>

        {/* Messages Area */}
        <div className="msg-messages-area">
          {messages.map(msg => (
            <div key={msg.id} className={`msg-row ${msg.type}`}>
              {msg.type === 'received' && (
                <div className="msg-row-avatar">{activeTalent?.image}</div>
              )}
              <div className="msg-bubble-wrap">
                <div className="msg-bubble">{msg.text}</div>
                <div className="msg-time">{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="msg-input-bar" onSubmit={handleSend}>
          <input
            type="text"
            className="msg-input"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="msg-send-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messenger;
