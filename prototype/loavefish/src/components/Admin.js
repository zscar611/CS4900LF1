import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
const handleLogout = () => {
          navigate('/');
  };
  return (
    <div className="App">
      <header>
        <img src={'/logo.jpg'} className="main-img" alt="logo" />
        <p className='dashboard-text'>Calendar</p>
      </header>
      <p>Currently Checked In</p>
      <p>Sauron | Pantry | 9:00am - 10:00am | 12/10/2023</p>
      <p>Future Appointments</p>
      <p>Frodo Baggins | Warehouse | 10:00am - 11:00am | 12/10/2023</p>
      <p>Tom Brady | Warehouse | 13:00am - 11:30am | 12/10/2023</p>
      <button>Add New Volunteer</button>
	  <button>Assign Shift to Volunteer</button>
	   <div className="main-button">
        <button className="main-button-box" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
