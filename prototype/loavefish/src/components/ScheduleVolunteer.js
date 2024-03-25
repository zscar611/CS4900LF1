import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import Calendar from "react-calendar";
import "./App.css";
import "./scheduleVolunteer.css";

function ScheduleVolunteer() {
	

  //declare variables
  const fullNameList = [];
  const nameInput = document.getElementById('nameInput');		
  const navigate = useNavigate();
  const [currentName, setCurrentName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [areaSelection, setAreaSelection] = useState("");
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nameFilled, setNameFilled] = useState(true);
  const [areaFilled, setAreaFilled] = useState(true);
  const [calendarFilled, setCalendarFilled] = useState(true);
  const [calendarOpened, setCalendarOpened] = useState(false);
  
  
  //TIME IN VARIABLES
  const [amInClicked, setAmInClicked] = useState(false);
  const [pmInClicked, setPmInClicked] = useState(false);
  const [timeInSelected, setTimeInSelected] = useState("");
  
  //TIME OUT VARIABLES
  const [amOutClicked, setAmOutClicked] = useState(false);
  const [pmOutClicked, setPmOutClicked] = useState(false);
  const [timeOutSelected, setTimeOutSelected] = useState("");
  
  
  
  
  
  
	//gets name data from DB
	const [allAccounts, setAllAccounts] = useState([]);
	const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/all", {
        method: "GET",
        mode: "cors",
      });
      if (response.ok) {
        const allUsers = await response.json();
		
  
        console.log("All users:", allUsers);
        setAllAccounts([]);
        allUsers.forEach((user) => {
          console.log(user["first name"], user["last name"]);
          setAllAccounts((prevAllAccounts) => [...prevAllAccounts, user]);
        });
      } else {
        console.error("Error fetching all users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };
	//adds names to fullNameList
	for(let i = 0; i < allAccounts.length; i++)
		{
		
			fullNameList.push(allAccounts[i]["first_name"] + " " + allAccounts[i]["last_name"]);
		}	
	
  
  
  
  
  
  
  // updates name
  const handleNameChange = (event) => {
	  getData();
	 document.getElementById('fullNamesList').innerHTML = fullNameList
	.map( name => `<option>${name}</option>`).join("")
    setCurrentName(event.target.value);
  };


  //update selected area
  const handleAreaSelectionChange = (event) => {
    setAreaSelection(event.target.value);
  };
  
  
  
  
  
  
  //updates timeIn
  const handleTimeInChange = (event) => {
    let newNum = event.target.value;
    let intValue = parseInt(newNum[newNum.length - 1]);
    // if data load is null its backspace
    if (event.nativeEvent.data == null) {
      if (event.target.value.length !== 2) {
        setTimeInSelected(event.target.value);
      } // if it has a semi colon delete two elements
      else {
        setTimeInSelected(newNum.slice(0, -1));
      }
    }
    // if data load has data add
    else {
      if (event.target.value === "") {
        setTimeInSelected("");
        return;
      }
      if (event.target.value.length < 6) {
        if (!isNaN(intValue)) {
          setTimeInSelected(event.target.value);
        }
        if (event.target.value.length === 2) {
          setTimeInSelected(event.target.value + ":");
        }
      }
    }
  };
	//updates AM and PM for TimeIn
  const handleAmInChange = () => {
    if (amInClicked === false) {
      setAmInClicked(true);
      setPmInClicked(false);
    }
  };
  const handlePmInChange = () => {
    if (pmInClicked === false) {
      setPmInClicked(true);
      setAmInClicked(false);
    }
  };






  //updates timeOut
  const handleTimeOutChange = (event) => {
    let newNum = event.target.value;
    let intValue = parseInt(newNum[newNum.length - 1]);
    // if data load is null its backspace
    if (event.nativeEvent.data == null) {
      if (event.target.value.length !== 2) {
        setTimeOutSelected(event.target.value);
      } // if it has a semi colon delete two elements
      else {
        setTimeOutSelected(newNum.slice(0, -1));
      }
    }
    // if data load has data add
    else {
      if (event.target.value === "") {
        setTimeOutSelected("");
        return;
      }
      if (event.target.value.length < 6) {
        if (!isNaN(intValue)) {
          setTimeOutSelected(event.target.value);
        }
        if (event.target.value.length === 2) {
          setTimeOutSelected(event.target.value + ":");
        }
      }
    }
  };
	//updates AM and PM timeOut
  const handleAmOutChange = () => {
    if (amOutClicked === false) {
      setAmOutClicked(true);
      setPmOutClicked(false);
    }
  };
  const handlePmOutChange = () => {
    if (pmOutClicked === false) {
      setPmOutClicked(true);
      setAmOutClicked(false);
    }
  };










  const formCompleted = () => {
    if (
      currentName !== "" &&
      calendarOpened === true &&
      areaSelection !== "" &&
      timeInSelected !== "" &&
	  timeOutSelected !== "" &&
      (amInClicked ===true || pmInClicked === true) &&
	  (amOutClicked ===true || pmOutClicked === true)
    ) {
      handleSubmit();
    }
    // if inputs are empty, set flag to highlight red
    if (currentName === "") {
      setNameFilled(false);
    } else {
      setNameFilled(true);
    }
   
    // if calendar has been opened
    if (calendarOpened === false) {
      setCalendarFilled(false);
    } else {
      setCalendarFilled(true);
    }
    if (areaSelection === "") {
      setAreaFilled(false);
    } else {
      setAreaFilled(true);
    }
    // time
  };






//sends data
  const sendData = async () => {
    try {
	  const formData = new FormData();
	  
	  
      let timeZone1 = "";
      if (amInClicked == true) {
        timeZone1 = "AM";
      } else { timeZone1 = "PM";}
	  
	  let timeZone2 = "";
      if (amOutClicked == true) {
        timeZone2 = "AM";
      } else { timeZone2 = "PM";}
	  
	  formData.append("full_name", currentName);
	  formData.append("area", areaSelection);
	  formData.append("date", selectedDate.toISOString().split('T')[0]);
	  formData.append("timeIn", (timeInSelected + " " +  timeZone1));
	  formData.append("timeOut", (timeOutSelected + " " + timeZone2));
	  formData.append("group", "");
	  console.log("Creating:", formData);

      const response = await fetch("http://localhost:5000/shift/ScheduleVolunteer", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
	  
    } catch (error) {
      console.error("Error: ", error);
    }
  };





//calls sendata and resets form
  const handleSubmit = () => {
    // send JSON to backend
    // reset all values
    sendData();
    setSelectedDate(new Date());
    setCurrentName("");
    setAreaSelection("");
    setTimeInSelected("");
    setNameFilled(true);
    setAreaFilled(true);
    setCalendarOpened(false);
    setAmInClicked(false);
    setPmInClicked(false);
  };




//CALENDAR STUFF
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
	  
	  
	  
      <div className="scheduleVol-container">

       <div className="scheduleVol-input">
          <p className="scheduleVol-text">Name: </p>
          <input

            type="text"
			list = "fullNamesList"
            placeholder="Click here"
            value={currentName}
            className={"schedulevol-inputName"}
            onChange={handleNameChange}
			id = "nameInput"
            style={{ borderColor: nameFilled ? "initial" : "red" }}
          />
		  <datalist id = "fullNamesList"></datalist>
        </div>
      

		
      <div>
        <div className="scheduleVol-dropdown">
          <p className="scheduleVol-text">Area: </p>
          <select
            className="volunteerAdd-dropdown-box"
            style={{ borderColor: areaFilled ? "initial" : "red" }}
            value={areaSelection}
            onChange={handleAreaSelectionChange}
          >
            <option value="">Select Area...</option>
            <option value="callCenter">Call Center</option>
            <option value="pantry">Pantry</option>
            <option value="homeDelivery">Home Delivery</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>

        <div className="scheduleVol-dropdown">
          <p className="scheduleVol-text">Day:</p>
          <div>
            <button
              className="volunteerAdd-dropdown-box"
              style={{ borderColor: calendarFilled ? "black" : "red" }}
              onClick={handleCalendarClick}
            >
              Calendar {selectedDate.toLocaleDateString()}
            </button>
            {isCalendarVisible && (
              <div className="volunteerAdd-modal" onClick={handleCalendarClick}>
                <div
                  className="volunteerAdd-modal-box"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>



      <div className="volunteerAdd-rows">
        <div className="volunteerAdd-inputTime">
          <p className="volunteerAdd-text">Time in: </p>
          <input
            type="text"
            placeholder="00:00"
            value={timeInSelected}
            onChange={handleTimeInChange}
            className={"volunteerAdd-input-box-time"}
            style={{ borderColor: nameFilled ? "initial" : "red" }}
          />
          <button
            style={{ background: amInClicked ? "green" : "gray" }}
            onClick={handleAmInChange}
            className="volunteerAdd-ButtonTime"
          >
            AM
          </button>
          <button
            style={{ background: pmInClicked ? "green" : "gray" }}
            onClick={handlePmInChange}
            className="volunteerAdd-ButtonTime"
          >
            PM
          </button>
        </div>



        <div className="volunteerAdd-inputTime">
          <p className="volunteerAdd-text">Time out: </p>
          <input
            type="text"
            placeholder="00:00"
            value={timeOutSelected}
            onChange={handleTimeOutChange}
            className={"volunteerAdd-input-box-time"}
            style={{ borderColor: nameFilled ? "initial" : "red" }}
          />
          <button
            style={{ background: amOutClicked ? "green" : "gray" }}
            onClick={handleAmOutChange}
            className="volunteerAdd-ButtonTime"
          >
            AM
          </button>
          <button
            style={{ background: pmOutClicked ? "green" : "gray" }}
            onClick={handlePmOutChange}
            className="volunteerAdd-ButtonTime"
          >
            PM
          </button>
        </div>
      </div>
      </div>











      <div className="main-button">
        <button className="main-button-box" onClick={formCompleted}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ScheduleVolunteer;