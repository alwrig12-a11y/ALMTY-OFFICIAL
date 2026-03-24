import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import WaitlistForm from './components/WaitlistForm';
import AdminDashboard from './components/AdminDashboard'; // For your Overseer view

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* THE CLASSIC GATEWAY (What you just pasted) */}
          <Route path="/" element={<Home />} />
          
          {/* THE NEW TYPEWRITER WAITLIST */}
          <Route path="/join" element={<WaitlistForm />} />
          
          {/* THE OVERSEER VAULT (almty.io/admin) */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;