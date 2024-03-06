import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Calendar from 'react-calendar';
import './App.css';
import './VolunteerAdd.css'

function Add() {
  const navigate = useNavigate();
  
  const [currentFirst, setCurrentFirst] = useState("");
  const [currentLast, setCurrentLast] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [submit, setSubmit] = useState(false);
  const [areaSelection, setAreaSelection] = useState("")
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSelected, setTimeSelected] = useState("");
  const handleFirstChange = (event) => {
    setCurrentFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setCurrentLast(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setCurrentPhone(event.target.value);
  };

  const handleAreaSelectionChange = (event) => {
    setAreaSelection(event.target.value);
  };

  const handleTimeSelectionChange = (event) => {
    setTimeSelected(event.target.value);
  };

  const sendData = async () => {
    try {

      const jsonData = {
        FirstName: currentFirst,
        LastName: currentLast,
        Area: areaSelection,
        Date: selectedDate,
        Time: areaSelection,
      };
      console.log(jsonData);;
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentFirst),
      });

    } catch (error) {
      console.error('Error: ', error);
    }
  }

  const handleSubmit = () => {
    // send JSON to backend
    // reset all values
    sendData();
    setSelectedDate(new Date());
    setCurrentFirst("");
    setCurrentLast("");
    setCurrentPhone("");
    setAreaSelection("");
    setTimeSelected("");
  };

  const handleCalendarClick = () => {
    setCalendarVisibility(!isCalendarVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarVisibility(false);
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
      
      <div className='volunteerAdd-dropdown'>
        <p className="volunteerAdd-text">Area: </p>
        <select className="volunteerAdd-dropdown-box" value={areaSelection} onChange={handleAreaSelectionChange}>
          <option value="">Select Area...</option>
          <option value="callCenter">Call Center</option>
          <option value="pantry">Pantry</option>
          <option value="homeDelivery">Home Delivery</option>
          <option value="warehouse">Warehouse</option>
        </select>
    </div>

    <div className='volunteerAdd-dropdown'>
      <p className="volunteerAdd-text">Day:</p>
      <div>
        <button className="volunteerAdd-dropdown-box" onClick={handleCalendarClick}>Calendar {selectedDate.toLocaleDateString()}</button>
        {isCalendarVisible && (
          <div className="volunteerAdd-modal" onClick={handleCalendarClick}>
            <div className="volunteerAdd-modal-box" onClick={(e) => e.stopPropagation()}>
              <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
          </div>
        )}
      </div>
    </div>

    <div className='volunteerAdd-dropdown'>
      <p className="volunteerAdd-text">Time: </p>
        <select className="volunteerAdd-dropdown-box" value={timeSelected} onChange={handleTimeSelectionChange}>
          <option value="">Select Time...</option>
          <option value="option1">Call Center</option>
          <option value="option2">Pantry</option>
          <option value="option3">Home Delivery</option>
          <option value="option4">Warehouse</option>
        </select>
    </div>

      <div className="main-button">
        <button className="main-button-box" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Add;
