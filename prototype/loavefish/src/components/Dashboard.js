import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

  return (
    <div className="App">
      <header>
        <img src={'/logo.jpg'} className="main-img" alt="logo" />
        <p className='dashboard-text'>Welcome Frodo Baggins! </p>
      </header>
      <p>Next Appointment: Warehouse | 10:00am - 11:00am | 12/10/2023</p>
      <p>Past Areas: Warehouse, Front Desk, Mailing</p>
      <p>Total Hours: 30 hours</p>
    </div>
  );
}

export default App;
