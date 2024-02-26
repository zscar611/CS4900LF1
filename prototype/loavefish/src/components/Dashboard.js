import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function Dashboard() {
	
	//CALENDAR STUFF
	
	//list of dates to style differently, this should be list of days that a user is scheduled
	const datesToAddClassTo = [];
	
	//applies styling to given days
	function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
      return 'myClassName';
    }}}
	
	 const [value, setValue] = useState(new Date());
    function onChange(nextValue) {
    setValue(nextValue);
    }
	
	//END CALENDAR STUFF
	
	
	const handleLogout = () => 
	{
    // TODO add SQL logic here
    navigate('/');
    };
 
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState("");
	
  
	
  
  
  return (
    <div className="App">
      <header>
        <img src={'/logo.jpg'} className="main-img" alt="logo" />
        <p className='dashboard-text'>Welcome Frodo Baggins! </p>
      </header>
	 
	 
	  <Calendar
      onChange={onChange}
      value={value}
	  tileClassName={tileClassName}
      />

      <p>Next Appointment: Warehouse | 10:00am - 11:00am | 12/10/2023</p>
      <p>Past Areas: Warehouse, Front Desk, Mailing</p>
      <p>Total Hours: 30 hours</p>
	   <div className="main-button">
        <button className="main-button-box" onClick={handleLogout}>Logout</button>
      </div>
    </div>
	
    
  );
}

export default Dashboard;
