import React, { useState } from 'react';
import Navbar from "./Navbar.js";
import { useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from 'react-calendar';
import './Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import { differenceInCalendarMonths } from 'date-fns';
function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function popup(props) 
{
  return <h1>Test!</h1>;
}
var active_index = 4000;
var new_index = 4001;
function VolunteerHome() {
	
	
	
	
	
	
	
	
	
	
	function getShiftData()
	{
		//TODO: get shift data from here
	}
	//CALENDAR STUFF
	
	//TODO: get json data for scheduled shift dates for a user here , (have 2 0s before number to work properly, 007, 0010, etc.) dates must be in chronological order!!!
	const scheduledDays = [];
	
	//TODO: populate here with dates from scheduledDays for the selected month
	const datesToAddClassTo = ['2024-03-007','2024-03-0010','2024-03-0015','2024-03-0021'];
	
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
	
	
	//adds content to given days
	function tileContent({ date, view }) 
	{
		// Add class to tiles in month view only
		if (view === 'month') 
		{
			// Check if a date React-Calendar wants to check is on the list of dates to add class to
			if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) 
			{
			return <div className="popup">
			
					
					<span className="popuptext">
					hello
					</span>
					<span className="dot"></span>
				   </div>;
			}
		}
	}
	
	//show popup of shift information
	function showPopup(date) 
	{
		var popups = document.getElementsByClassName("popuptext");
		//if active day is a scheduled day
		if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) 
			{
				//TODO: Call query that displays shift entries for a given day
				
				
				
				
				
				
				
				
				
				
				
				
				//get index in list of scheduled days to show popup correctly
				new_index = datesToAddClassTo.findIndex(dDate => isSameDay(dDate, date));
				
				//date is the same as before, don't toggle
				if (new_index == active_index)
				{
					var test2 = 1;
				}
				else
				{	
					if (active_index != 4000)
					{	
						//toggles off old selected date
						
					}
				
					//shows popup over active index
					active_index = new_index;
				
					
					
				}
			}
		else
		{
			console.log(active_index);
			//if no day was previously selected, do nothing
			if (active_index == 4000)
			{
					console.log(active_index);
					var test = 0;
			}
			//if a day was previously selected, toggle it off
			else
			{
			console.log(active_index);
		
			active_index = 4000;
			
			}
		}
	}
	
	
	const [value, setValue] = useState();
	
	
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
	<Navbar />
      <header>
		<p>  </p>
	
      </header>

	 <center>
	  <Calendar
      onChange={onChange}
      value={value}
	  onClickDay = {showPopup}
	  tileClassName={tileClassName}
	  tileContent={tileContent}
      />
	 </center>
		
    </div>
	
    
  );
}

export default VolunteerHome;
