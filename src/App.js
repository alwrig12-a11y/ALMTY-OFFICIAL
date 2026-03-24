import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import WaitlistForm from './components/WaitlistForm';

function App() {
  return (
    <Router>
        <Routes>
          {/* THE PRIMARY GATEWAY (Your index.html content) */}
          <Route path="/" element={<Home />} />
          
          {/* THE NEW TYPEWRITER PROTOCOL (/join) */}
          <Route path="/join" element={<WaitlistForm />} />
        </Routes>
    </Router>
  );
}

export default App;