import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './components/Login.js';
import VolunteerHome from './components/VolunteerHome.js';
import TimeSheet from './components/TimeSheet';
import Reports from './components/Reports.js'
import ScheduleVolunteer from './components/ScheduleVolunteer.js';
import AdminHome from './components/AdminHome.js';
import Profiles from './components/Profiles.js';
import CreateVolunteer from './components/CreateVolunteer.js';
import TimeAuto from './components/TimeAutonomous.js';
import Calendar from './components/Calendar.js';

function App() {
  const [data, setData] = useState([{}]) 
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/volunteerhome" element={<VolunteerHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/timesheet" element={<TimeSheet/>} />
          <Route path="/autotime" element={<TimeAuto/>} />
          <Route path="/ScheduleVolunteer" element={< ScheduleVolunteer/>} />
          <Route path="/profiles" element={< Profiles/>} />
          <Route path='/CreateVolunteer' element={< CreateVolunteer/>} />
          <Route path='/CreateVolunteer' element={< CreateVolunteer/>} />
		  <Route path='/Calendar' element={< Calendar/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
