import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Routes, Route, and Link
import { Navigate } from 'react-router-dom';
import Home from './components/Main'; // Import your Home component
import Dashboard from './components/Dashboard'; // Import your About component
import Admin from './components/Admin';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
