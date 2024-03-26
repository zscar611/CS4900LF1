import React, { useState } from 'react';
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
						popups[active_index].classList.toggle("show");
					}
				
					//shows popup over active index
					active_index = new_index;
					popups[active_index].classList.toggle("show");
					
					
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
			popups[active_index].classList.toggle("show");
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
  
	const sendRequest = async () => {
		try {
		  const response = await fetch("http://localhost:5000/auth/logout", {
			method: "POST",
			mode: "cors"
		  });
		  if (response.ok) {
			
			console.log("Response received");
			const responseData = await response.json();
			// if logged in
			if (responseData.SUCCESS) {
			  console.log("Logged Out");
			  return true;
			}
			// if error
			if (responseData.ERROR) {
			  console.log(responseData.ERROR)
			  
			  return false;
			}
		  }
		} catch (error) {
		  console.error("Message Not Sent: ", error);
		}
	  };


	const handleLogout = async () => 
	{
		const result = await sendRequest();
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
		<p>Favorite Areas: Warehouse, Front Desk, Mailing</p>
        <p>Total Hours Volunteered: 30 </p>
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
		
		
	
   
	   <div className="main-button">
        <button className="main-button-box" onClick={handleLogout}>Logout</button>
      </div>
    </div>
	
    
  );
}

export default VolunteerHome;
