import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import './App.css';


function Add() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

  return (
    <div className="App">
      <Navbar />
      <header>
        <img src={'/logo.jpg'} className="main-img" alt="logo" />
        <p className='dashboard-text'>Calendar</p>
      </header>
      <p>Currently Checked In</p>
      <p>Lionel Messi | Pantry | 9:00am - 10:00am | 12/10/2023</p>
      <p>Future Appointments</p>
      <p>Frodo Baggins | Warehouse | 10:00am - 11:00am | 12/10/2023</p>
      <p>Tom Brady | Warehouse | 13:00am - 11:30am | 12/10/2023</p>
      <button onClick={navigate('/Admin')} >Add New Volunteer</button>
    </div>
  );
}

export default Add;
