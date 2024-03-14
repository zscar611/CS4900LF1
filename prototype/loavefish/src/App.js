import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './components/Main';
import Dashboard from './components/Dashboard';
import TimeSheet from './components/TimeSheet';
import Reports from './components/Reports.js'
import VolunteerAdd from './components/VolunteerAdd.js';
import AdminHome from './components/AdminHome.js';

function App() {
  const [data, setData] = useState([{}]) 
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/timesheet" element={<TimeSheet/>} />
          <Route path="/volunteerAdd" element={< VolunteerAdd/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
