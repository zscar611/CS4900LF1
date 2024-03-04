import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './Reports.css';
import Navbar from './Navbar.js';

function Report() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const handleLogout = () => {
          navigate('/');
  };
  return (
    <div className="App">
      <Navbar /> 
      <div className="report-align-items">
      <h1>This Weeks Report</h1>
        <div className="main-button">
          <button className="main-button-box" style={{display: "flex"}} onClick={handleLogout}>Generate</button>
        </div>
      </div>
      <div className="report-align-items">
        <h1>This Months Report</h1>
        <div className="main-button">
          <button className="main-button-box" style={{display: "flex"}} onC     lick={handleLogout}>Generate</button>
        </div>
      </div>
      <div className="report-align-items">
        <h1>This Years Report</h1>
        <div className="main-button">
          <button className="main-button-box" style={{display: "flex"}} onC     lick={handleLogout}>Generate</button>
        </div>
      </div>
      <div className="report-align-items">
        <h1>All Time Report</h1>
        <div className="main-button">
          <button className="main-button-box" style={{display: "flex"}} onC     lick={handleLogout}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default Report;
