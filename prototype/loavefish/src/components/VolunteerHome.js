import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from 'react-calendar';
import './Calendar.css';
import { differenceInCalendarDays } from 'date-fns';

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function VolunteerHome() {
	
	//CALENDAR STUFF
	
	//TODO: get json data for scheduled shifts for a user here, add 1 to the day value for some weird reason to get it right
	const datesToAddClassTo = ['2024-03-08','2024-03-10','2024-03-15'];
	
	//applies styling to given days
	function tileClassName({ date, view }) 
	{
		// Add class to tiles in month view only
		if (view === 'month') 
		{
			// Check if a date React-Calendar wants to check is on the list of dates to add class to
			if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) 
			{
				return 'scheduledDate';
		
			}
			else
				return 'normalDate';
		}
	}
	function tileContent({ date, view }) 
	{
		// Add class to tiles in month view only
		if (view === 'month') 
		{
			// Check if a date React-Calendar wants to check is on the list of dates to add class to
			if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) 
			{
			return <div><span class="dot"></span></div>;
			}
		}
	}
	
	const [value, setValue] = useState(new Date());
	
	
    function onChange(nextValue) 
	{
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
        <img src={'/logo-burned.png'} className="main-img" alt="logo"/>
        <p className='dashboard-text'>Hello, Frodo!</p>
		<p>Next Appointment: 12/10/2023 | 10:00am - 11:00am | Warehouse </p>
      </header>
	 
	 <center>
	  <Calendar
      onChange={onChange}
      value={value}
	  tileClassName={tileClassName}
	  tileContent={tileContent}
      />
	 </center>

   
      <p>Favorite Areas: Warehouse, Front Desk, Mailing</p>
      <p>Total Hours Volunteered: 30 </p>
	   <div className="main-button">
        <button className="main-button-box" onClick={handleLogout}>Logout</button>
      </div>
    </div>
	
    
  );
}

export default VolunteerHome;
