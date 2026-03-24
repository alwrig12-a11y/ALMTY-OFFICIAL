import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import WaitlistForm from './components/WaitlistForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* CRITICAL: The "/" path MUST point to Home */}
          <Route path="/" element={<Home />} />
          
          {/* The "/join" path points to the page in your screenshot */}
          <Route path="/join" element={<WaitlistForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;