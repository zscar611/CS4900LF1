import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import Calendar from "react-calendar";
import "./App.css";

function CreateVolunteer() {
  const navigate = useNavigate();
  // declare variables
  const [currentFirst, setCurrentFirst] = useState("");
  const [currentLast, setCurrentLast] = useState("");
  const [currentPhone, setCurrentPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [firstFilled, setFirstFilled] = useState(true);
  const [lastFilled, setLastFilled] = useState(true);
  const [phoneFilled, setPhoneFilled] = useState(true);
  // change first and last name as user types
  const handleFirstChange = (event) => {
    setCurrentFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setCurrentLast(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setCurrentPassword(event.target.value);
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

  const formCompleted = () => {
    if (
      currentFirst !== "" &&
      currentLast !== "" &&
      currentPhone !== "" &&
      currentPhone.length === 10
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
  };

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', currentFirst);
      formData.append('last_name', currentLast);
      formData.append('phone_number', currentPhone);
      formData.append('password1', currentPassword);
      formData.append('password2', currentPassword);
  
      console.log("Creating:", formData);
  
      const response = await fetch("http://localhost:5000/auth/sign-up", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSubmit = () => {
    // send JSON to backend
    // reset all values
    sendData();
    setCurrentFirst("");
    setCurrentLast("");
    setCurrentPhone("");
    setCurrentPassword("");
    setFirstFilled(true);
    setLastFilled(true);
    setPhoneFilled(true);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="box">
      <header>
        <h1>Create Volunteer Account</h1>
      </header>
        <div className="volunteerAdd-input">
          <p className="volunteerAdd-text">Name: </p>
          <input
            type="text"
            placeholder="Enter first name"
            value={currentFirst}
            onChange={handleFirstChange}
            className={"volunteerAdd-input-box"}
            style={{ borderColor: firstFilled ? "initial" : "red" }}
          />
        </div>
        <div className="volunteerAdd-input">
          <input
            type="text"
            placeholder="Enter last name"
            value={currentLast}
            onChange={handleLastChange}
            className={"volunteerAdd-input-box"}
            style={{ borderColor: lastFilled ? "initial" : "red" }}
          />
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
        <div>
          <div className="volunteerAdd-input">
            <p className="volunteerAdd-text">DOB:</p>
            <input
              type="text"
              placeholder="Enter DOB"
              value={currentPassword}
              style={{ borderColor: phoneFilled ? "initial" : "red" }}
              onChange={handlePasswordChange}
              className={"volunteerAdd-input-box-phone"}
            />
          </div>
        </div>
        <div className="main-button">
          <button className="main-button-box" onClick={formCompleted}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateVolunteer;
