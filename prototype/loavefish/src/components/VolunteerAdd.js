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
  const [firstFilled, setFirstFilled] = useState(true);
  const [lastFilled, setLastFilled] = useState(true);
  const [areaFilled, setAreaFilled] = useState(true);
  const [phoneFilled, setPhoneFilled] = useState(true);
  const [calendarFilled, setCalendarFilled] = useState(true);
  const [calendarOpened, setCalendarOpened] = useState(false);

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

  const handleTimeChange = (event) => {
    const timeInput = event.target.value;
    let newTime = "";
    if (timeInput.length > 0) {
      newTime = timeInput.slice(0, 2);
      let minutes = timeInput.slice(3, 5);
      if (timeInput.length > 1) {
        newTime = newTime + ":";
      }
      if (timeInput.length > 2) {
        newTime = newTime + minutes;
      }
    }
    setTimeSelected(newTime);
  };
  
  const formCompleted = () => {
    console.log(calendarOpened);
    if (currentFirst !== "" && currentLast !== "" && currentPhone !== "" && calendarOpened === true && areaSelection !== "" && timeSelected !== "") {
      handleSubmit();
    }
    // if inputs are empty, set flag to highlight red
    if (currentFirst === "") {
      setFirstFilled(false);
    } else { setFirstFilled(true); }
    if (currentLast === "") {
      setLastFilled(false);
    } else { setLastFilled(true); }
    if (currentPhone === "") {
      setPhoneFilled(false);
    } else { setPhoneFilled(true); }    
    // if calendar has been opened
    if (calendarOpened === false) {
      setCalendarFilled(false);
    } else { setCalendarFilled(true); }  
    if (areaSelection === "") {
      setAreaFilled(false);
    } else { setAreaFilled(true); }
    // time
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
    setFirstFilled(true);
    setLastFilled(true);
    setAreaFilled(true);
    setPhoneFilled(true);
    setCalendarOpened(false);
  };

  const handleCalendarClick = () => {
    setCalendarVisibility(!isCalendarVisible);
    setCalendarOpened(true);
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
            style={{ borderColor: firstFilled ? 'initial' : 'red' }}
          />
      </div>
      <div className='volunteerAdd-input'>
        <input
          type="text"
          placeholder="Enter last name"
          value={currentLast}
          onChange={handleLastChange}
          className={"volunteerAdd-input-box"}
          style={{ borderColor: lastFilled ? 'initial' : 'red' }}
        />
      </div>
      <div>
        <div className='volunteerAdd-input'>
        <p className="volunteerAdd-text">Phone Number: </p>
            <input
              type="text"
              placeholder="(123)-456-7890"
              value={currentPhone}
              style={{ borderColor: phoneFilled ? 'initial' : 'red' }} 
              onChange={handlePhoneChange}
              className={"main-input-box"}
            />
        </div>
      </div>
      
      <div className='volunteerAdd-dropdown'>
        <p className="volunteerAdd-text">Area: </p>
        <select className="volunteerAdd-dropdown-box" style={{ borderColor: areaFilled ? 'initial' : 'red' }} value={areaSelection} onChange={handleAreaSelectionChange}>
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
        <button className="volunteerAdd-dropdown-box" style={{ borderColor: calendarFilled ? 'black' : 'red' }} onClick={handleCalendarClick}>Calendar {selectedDate.toLocaleDateString()}</button>
        {isCalendarVisible && (
          <div className="volunteerAdd-modal" onClick={handleCalendarClick}>
            <div className="volunteerAdd-modal-box" onClick={(e) => e.stopPropagation()}>
              <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
          </div>
        )}
      </div>
    </div>

    <div className='volunteerAdd-input'>
        <p className="volunteerAdd-text">Time: </p>
          <input
            type="text"
            placeholder="00:00 AM/PM"
            value={timeSelected}
            onChange={handleTimeChange}
            className={"volunteerAdd-input-box"}
            style={{ borderColor: firstFilled ? 'initial' : 'red' }}
          />
      </div>

      <div className="main-button">
        <button className="main-button-box" onClick={formCompleted}>Submit</button>
      </div>
    </div>
  );
}

export default Add;
