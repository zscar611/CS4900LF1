import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import './App.css';
import './VolunteerAdd.css'

function Add() {
  const navigate = useNavigate();
  
  const [currentFirst, setCurrentFirst] = useState("");
  const [currentLast, setCurrentLast] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleFirstChange = (event) => {
    setCurrentFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setCurrentLast(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setCurrentPhone(event.target.value);
  };

  const handleSubmit = () => {
    // send JSON to backend
    // reset all values
    setCurrentFirst("");
    setCurrentLast("");
    setCurrentPhone("");
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar />
      <header>
      <h1>Schedule Volunteers</h1>
      </header>
      <div className='volunteerAdd-input'>
      <p className="volunteerAdd-text">Name: </p>
        <input
          type="text"
          placeholder="Enter first name"
          value={currentFirst}
          onChange={handleFirstChange}
          className={"volunteerAdd-input-box"}
        />
      </div>
      <div className='volunteerAdd-input'>
        <input
          type="text"
          placeholder="Enter last name"
          value={currentLast}
          onChange={handleLastChange}
          className={"volunteerAdd-input-box"}
        />
      </div>
      <div>
        <div className='volunteerAdd-input'>
        <p className="volunteerAdd-text">Phone Number: </p>
            <input
              type="text"
              placeholder="(123)-456-7890"
              value={currentPhone}
              onChange={handlePhoneChange}
              className={"main-input-box"}
            />
        </div>
      </div>
      <div className="main-button">
        <button className="main-button-box" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Add;
