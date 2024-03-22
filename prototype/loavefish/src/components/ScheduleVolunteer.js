import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import Calendar from "react-calendar";
import "./App.css";
import "./ScheduleVolunteer.css";

function ScheduleVolunteer() {
	

	//list of names to populate
	const fullNameList = [];
  
	//list of names to concantenate
	const firstNameList = [];
	const lastNameList = []; 
	const nameInput = document.getElementById('nameInput');		
  
  
	//gets name data
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

 console.log(fullNameList);
for(let i = 0; i < allAccounts.length; i++)
		{
		
			fullNameList.push(allAccounts[i]["first_name"] + " " + allAccounts[i]["last_name"]);
		}	
	
  
  
	
  const navigate = useNavigate();
  // declare variables
  const [currentFirst, setCurrentFirst] = useState("");
  const [currentLast, setCurrentLast] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [submit, setSubmit] = useState(false);
  const [areaSelection, setAreaSelection] = useState("");
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSelected, setTimeSelected] = useState("");
  const [firstFilled, setFirstFilled] = useState(true);
  const [lastFilled, setLastFilled] = useState(true);
  const [areaFilled, setAreaFilled] = useState(true);
  const [phoneFilled, setPhoneFilled] = useState(true);
  const [calendarFilled, setCalendarFilled] = useState(true);
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [amClicked, setAmClicked] = useState(false);
  const [pmClicked, setPmClicked] = useState(false);
  // change first and last name as user types
  const handleFirstChange = (event) => {
	  getData();
	 document.getElementById('fullNamesList').innerHTML = fullNameList
	.map( name => `<option>${name}</option>`).join("")
    setCurrentFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setCurrentLast(event.target.value);
  };
  // change phone number as user types
  const handlePhoneChange = (event) => {
    let newNum = event.target.value;
    // get the most recently typed element
    newNum = newNum[newNum.length - 1];
    let intValue = parseInt(newNum);
    // only allow phone numbers of length 10
    if (event.target.value.length < 11) {
      // Check if the last element is a number, add to phone number
      if (!isNaN(intValue)) {
        setCurrentPhone(event.target.value);
      }
    }
    // if input is empty, set to empty string
    if (event.target.value === "") {
      setCurrentPhone("");
    }
  };
  
  const handleAreaSelectionChange = (event) => {
    setAreaSelection(event.target.value);
  };

  const handleTimeChange = (event) => {
    let newNum = event.target.value;
    let intValue = parseInt(newNum[newNum.length - 1]);
    // if data load is null its backspace
    if (event.nativeEvent.data == null) {
      if (event.target.value.length !== 2) {
        setTimeSelected(event.target.value);
      } // if it has a semi colon delete two elements
      else {
        setTimeSelected(newNum.slice(0, -1));
      }
    }
    // if data load has data add
    else {
      if (event.target.value === "") {
        setTimeSelected("");
        return;
      }
      if (event.target.value.length < 6) {
        if (!isNaN(intValue)) {
          setTimeSelected(event.target.value);
        }
        if (event.target.value.length === 2) {
          setTimeSelected(event.target.value + ":");
        }
      }
    }
  };

  const handleAmChange = () => {
    if (amClicked === false) {
      setAmClicked(true);
      setPmClicked(false);
    }
  };

  const handlePmChange = () => {
    if (pmClicked === false) {
      setPmClicked(true);
      setAmClicked(false);
    }
  };

  const formCompleted = () => {
    if (
      currentFirst !== "" &&
      currentLast !== "" &&
      currentPhone !== "" &&
      currentPhone.length === 10 &&
      calendarOpened === true &&
      areaSelection !== "" &&
      timeSelected !== "" &&
      (amClicked ===true || pmClicked === true)
    ) {
      handleSubmit();
    }
    // if inputs are empty, set flag to highlight red
    if (currentFirst === "") {
      setFirstFilled(false);
    } else {
      setFirstFilled(true);
    }
    if (currentLast === "") {
      setLastFilled(false);
    } else {
      setLastFilled(true);
    }
    if (currentPhone === "" || currentPhone.length != 10) {
      setPhoneFilled(false);
    } else {
      setPhoneFilled(true);
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

  const sendData = async () => {
    try {
      let timeZone = "";
      if (amClicked == true) {
        timeZone = "AM";
      } else { timeZone = "PM";}
      const jsonData = {
        FirstName: currentFirst,
        LastName: currentLast,
        Area: areaSelection,
        Date: selectedDate,
        Time: timeSelected,
        TimeZone: timeZone,
      };
      console.log(jsonData);
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentFirst),
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
    setAmClicked(false);
    setPmClicked(false);
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
	  
	  
	  
	  
       <div  className="volunteerAdd-input">
          <p className="volunteerAdd-text">Name: </p>
          <input
		    
            type="text"
			list = "fullNamesList"
            placeholder="Click here"
            value={currentFirst}
            onChange={handleFirstChange}
            className={"volunteerAdd-input-box"}
			id = "nameInput"
            style={{ borderColor: firstFilled ? "initial" : "red" }}
          />
		  <datalist id = "fullNamesList"></datalist>
        </div>
      <div>
        <div className="volunteerAdd-input">
          <p className="volunteerAdd-text">Phone Number: </p>
          <input
            type="text"
            placeholder="(123)-456-7890"
            value={currentPhone}
            style={{ borderColor: phoneFilled ? "initial" : "red" }}
            onChange={handlePhoneChange}
            className={"volunteerAdd-input-box-phone"}
          />
        </div>
      </div>

		
	
      <div className="volunteerAdd-dropdown">
        <p className="volunteerAdd-text">Area: </p>
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

      <div className="volunteerAdd-dropdown">
        <p className="volunteerAdd-text">Day:</p>
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

      <div className="volunteerAdd-inputTime">
        <p className="volunteerAdd-text">Time: </p>
        <input
          type="text"
          placeholder="00:00"
          value={timeSelected}
          onChange={handleTimeChange}
          className={"volunteerAdd-input-box-time"}
          style={{ borderColor: firstFilled ? "initial" : "red" }}
        />
        <button
          style={{ background: amClicked ? "green" : "gray" }}
          onClick={handleAmChange}
          className="volunteerAdd-ButtonTime"
        >
          AM
        </button>
        <button
          style={{ background: pmClicked ? "green" : "gray" }}
          onClick={handlePmChange}
          className="volunteerAdd-ButtonTime"
        >
          PM
        </button>
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
