import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TalentDashboard from './pages/TalentDashboard';
import Details from './pages/Details';
import EventDetails from './pages/EventDetails';
import Messenger from './pages/Messenger';
import TalentProfile from './pages/Profile';
import MyEvents from './pages/MyEvents';
import TalentSignup from './pages/TalentSignup';
import UserSignup from './pages/UserSignup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user');

  const handleLogin = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('user');
  };

  return (
    <Router>
      <div className={`app-container ${isLoggedIn ? 'dashboard-active' : ''} ${role}-module`}>
        {isLoggedIn && <Navbar role={role} onLogout={handleLogout} />}
        
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={!isLoggedIn ? <Home onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          <Route path="/talent/signup" element={<TalentSignup />} />
          <Route path="/user/signup" element={<UserSignup />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? (role === 'talent' ? <TalentDashboard /> : <Dashboard />) : <Navigate to="/" />} 
          />
          <Route 
            path="/event/:id" 
            element={isLoggedIn ? <EventDetails /> : <Navigate to="/" />} 
          />
          <Route 
            path="/details/:id" 
            element={isLoggedIn ? <Details /> : <Navigate to="/" />} 
          />
          <Route 
            path="/chat/:id" 
            element={isLoggedIn ? <Messenger /> : <Navigate to="/" />} 
          />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <TalentProfile onLogout={handleLogout} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/my-events" 
            element={isLoggedIn ? <MyEvents /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
