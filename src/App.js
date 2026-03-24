import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import WaitlistForm from './components/WaitlistForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* THE PRIMARY GATEWAY (Your index.html content) */}
          <Route path="/" element={<Home />} />
          
          {/* THE TYPEWRITER PROTOCOL (The new waitlist form) */}
          <Route path="/join" element={<WaitlistForm />} />
          
          {/* THE OVERSEER VAULT */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;