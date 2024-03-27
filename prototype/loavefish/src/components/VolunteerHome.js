import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Calendar from "react-calendar";
import "./Calendar.css";
import "./volunteerHome.css";
import { differenceInCalendarDays } from "date-fns";
import { differenceInCalendarMonths } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faRightFromBracket,
  faTrash,
  faPenToSquare,
  faUser
} from "@fortawesome/free-solid-svg-icons";

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function popup(props) {
  return <h1>Test!</h1>;
}
var active_index = 4000;
var new_index = 4001;

function VolunteerHome() {
  const [openInstructions, setOpenInstructions] = useState(false);
  const [value, setValue] = useState();  
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");


  const openInstructionModal = () => {
    setOpenInstructions(true);
  };

  const closeInstructionModal = () => {
    setOpenInstructions(false);
  };

  function getShiftData() {
    //TODO: get shift data from here
  }
  //CALENDAR STUFF

  //TODO: get json data for scheduled shift dates for a user here , (have 2 0s before number to work properly, 007, 0010, etc.) dates must be in chronological order!!!
  const scheduledDays = [];

  //TODO: populate here with dates from scheduledDays for the selected month
  const datesToAddClassTo = [
    "2024-03-007",
    "2024-03-0010",
    "2024-03-0015",
    "2024-03-0021",
  ];

  //applies styling to given days
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return "scheduledDate";
      } else return "normalDate";
    }
  }

  //adds content to given days
  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return (
          <div className="popup">
            <span className="popuptext">hello</span>
            <span className="dot"></span>
          </div>
        );
      }
    }
  }

  //show popup of shift information
  function showPopup(date) {
    var popups = document.getElementsByClassName("popuptext");
    //if active day is a scheduled day
    if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
      //get index in list of scheduled days to show popup correctly
      new_index = datesToAddClassTo.findIndex((dDate) =>
        isSameDay(dDate, date)
      );

      //date is the same as before, don't toggle
      if (new_index == active_index) {
        var test2 = 1;
      } else {
        if (active_index != 4000) {
          //toggles off old selected date
          popups[active_index].classList.toggle("show");
        }

        //shows popup over active index
        active_index = new_index;
        popups[active_index].classList.toggle("show");
      }
    } else {
      console.log(active_index);
      //if no day was previously selected, do nothing
      if (active_index == 4000) {
        console.log(active_index);
        var test = 0;
      }
      //if a day was previously selected, toggle it off
      else {
        console.log(active_index);
        popups[active_index].classList.toggle("show");
        active_index = 4000;
      }
    }
  }


  function onChange(nextValue) {
    setValue(nextValue);
  }

  //END CALENDAR STUFF

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        mode: "cors",
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
          console.log(responseData.ERROR);

          return false;
        }
      }
    } catch (error) {
      console.error("Message Not Sent: ", error);
    }
  };

  const handleLogout = async () => {
    const result = await sendRequest();
    navigate("/");
  };

  const navigateProfile = async () => {
    navigate("/VolunteerAccount");
  };

  return (
    <div className="App">
      <header>
        <img
          src={"/logo-Burned.png"}
          className="volunteerHome-img"
          alt="logo"
        />
      </header>
      <div className="volunteerHome-name-container">
        <h1>Hello Frodo Baggins</h1>
      </div>

      {openInstructions && (
        <div className="profiles-modal">
          <div className="profiles-modal-box">
            <p>You have been signed in for Pantry from 10:30 am - 11:30 am</p>
            <p>Instructions: Wait in lobby for the team lead</p>
            <div className="profile-button">
              <button
                className="profile-button-box"
                onClick={closeInstructionModal}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="volunteerHome-buttonTopScreen">
        <button className="volunteerHome-button-boxTopScreen" onClick={navigateProfile}>
          <FontAwesomeIcon
            icon={faUser}
            className="profile-icons-element"
          />
          Account
        </button>
      </div>

      <div className="volunteerHome-buttonTopScreen">
        <button className="volunteerHome-button-boxTopScreen">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="profile-icons-element"
          />
          Edit
        </button>
      </div>
      <div className="volunteerHome-buttonTopScreen">
        <button
          className="volunteerHome-button-boxTopScreen"
          onClick={handleLogout}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="profile-icons-element"
          />
          Logout
        </button>
      </div>

      <div className="volunteerHome-style">
        <div className="volunteerHome-statBox">
          <div className="volunteerHome-statBox-firstLine">
            <div className="volunteerHome-leftHalf">
              <p className="profile-text">Next Shift:</p>
              <p className="profile-text">Last Shift: </p>
              <p className="profile-text">Groups:</p>
              <p className="profile-text">Favorite Area:</p>
              <p className="profile-text">Total Hours:</p>
              <p className="profile-text">Yearly Hours:</p>
              <p className="profile-text">Total Shifts:</p>
              <p className="profile-text">Yearly Shifts:</p>
            </div>
            <div className="volunteerHome-calendar">
              <center>
                <Calendar
                  onChange={onChange}
                  value={value}
                  onClickDay={showPopup}
                  tileClassName={tileClassName}
                  tileContent={tileContent}
                />
              </center>
            </div>
          </div>
          <div className="volunteer-input">
            <input
              type="text"
              placeholder="Enter Code"
              className={"main-input-box"}
            />
            <div className="volunteerHome-button">
              <button
                className="volunteerHome-button-box"
                onClick={openInstructionModal}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerHome;
