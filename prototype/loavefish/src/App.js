import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Routes, Route, and Link
import { Navigate } from 'react-router-dom';
import Home from './components/Main'; // Import your Home component
import Dashboard from './components/Dashboard'; // Import your About component
import Admin from './components/Admin';
import Reports from './components/Reports.js'
import VolunteerAdd from './components/VolunteerAdd.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/volunteerAdd" element={< VolunteerAdd/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
