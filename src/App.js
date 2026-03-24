import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import WaitlistForm from './components/WaitlistForm';
import AdminLogin from './components/AdminLogin'; // We will create this next
import logo from './logo.png';

// --- THE HOME COMPONENT (Your original index.html content goes here) ---
const Home = () => (
  <div className="home-container">
    <img src={logo} className="almty-logo-glow" alt="ALMTY Logo" />
    <p className="protocol-text">ALMTY SOVEREIGN CLOTHING</p>
    
    {/* This button now takes them to the React terminal page */}
    <Link to="/join">
      <button className="terminal-btn">[ INITIALIZE_JOIN_SEQUENCE ]</button>
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* THE PUBLIC GATES */}
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<WaitlistForm />} />
          
          {/* THE OVERSEER GATE (almty.io/admin) */}
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;