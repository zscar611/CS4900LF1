import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './Admin.css';
import Navbar from './Navbar.js';

function Admin() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const handleLogout = () => {
      // TODO insert SQL logic here    
      navigate('/');
  };
  return (
    <div className="App">
      <Navbar />
      <div className = "admin-top-text">
      <h1>Volunteer Time Sheet</h1>
      <div className="main-button">
        <button className="main-button-box" style={{display: "flex"}} onClick={handleLogout}>Logout</button>
      </div>
      </div>
      <p>Currently Checked In     -       Check In</p>
      <p>Sauron | Pantry | 9:00am - 10:00am | 12/10/2023</p>
      <p>Future Appointments</p>
      <p>Frodo Baggins | Warehouse | 10:00am - 11:00am | 12/10/2023</p>
      <p>Tom Brady | Warehouse | 13:00am - 11:30am | 12/10/2023</p>
    </div>
  );
}

export default Admin;
