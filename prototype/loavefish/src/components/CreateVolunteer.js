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
  let phoneNumberInt = "";
  const [currentDOB, setCurrentDOB] = useState("");
  const [submit, setSubmit] = useState(false);
  const [firstFilled, setFirstFilled] = useState(true);
  const [lastFilled, setLastFilled] = useState(true);
  const [phoneFilled, setPhoneFilled] = useState(true);
  const [dobFilled, setDOBFilled] = useState(true);
  // change first and last name as user types
  const handleFirstChange = (event) => {
    setCurrentFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setCurrentLast(event.target.value);
  };

  const handleDOBChange = (event) => {
    let newNum = event.target.value;
    let intValue = parseInt(newNum[newNum.length - 1]);
    // if data load is null its backspace
    if (event.nativeEvent.data == null) {
      if (event.target.value.length !== 2 && event.target.value.length !== 5) {
        setCurrentDOB(event.target.value);
      } // if it has a / delete two elements
      else {
        setCurrentDOB(newNum.slice(0, -1));
      }
    }
    // if data load has data add
    else {
      if (event.target.value === "") {
        setCurrentDOB("");
        return;
      }
      if (event.target.value.length < 11) {
        if (!isNaN(intValue)) {
          setCurrentDOB(event.target.value);
        }
        if (event.target.value.length === 2 || event.target.value.length === 5) {
          setCurrentDOB(event.target.value + "/");
        }
      }
    }
  };

  // change phone number as user types
  const handlePhoneChange = (event) => {
    let newNum = event.target.value;
    let intValue = parseInt(newNum[newNum.length - 1]);
    // if data load is null its backspace
    if (event.nativeEvent.data == null) {
      if (event.target.value.length !== 1 && event.target.value.length !== 4 && event.target.value.length !== 8) {
        setCurrentPhone(event.target.value);
        
      } // if it has a / delete two elements
      else {
        setCurrentPhone(newNum.slice(0, -1));
      }
    }
    // if data load has data add
    else {
      if (event.target.value === "") {
        setCurrentPhone("");
        return;
      }
      if (event.target.value.length < 14) {
        if (!isNaN(intValue)) {
          setCurrentPhone(event.target.value);
        }
        if ((event.target.value.length - 1) === 0) {
          setCurrentPhone("(" + event.target.value);
        }
        if ((event.target.value.length - 1) === 3) {
          setCurrentPhone(event.target.value + ")");
        }
        if ((event.target.value.length - 1) === 7) {
          setCurrentPhone(event.target.value + "-");
        }
      }
    }
  };

  const formCompleted = () => {
    for (let i = 0; i < currentPhone.length; i++) {
      if (!isNaN(currentPhone[i])){
        phoneNumberInt = phoneNumberInt + currentPhone[i];
      }
    }
    if (
      currentFirst !== "" &&
      currentLast !== "" &&
      currentPhone !== "" &&
      phoneNumberInt.length === 10 &&
      currentDOB !== "" &&
      currentDOB.length === 10
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
    if (currentPhone === "" || phoneNumberInt.length != 10) {
      setPhoneFilled(false);
    } else {
      setPhoneFilled(true);
    }
    if (currentDOB === "" || currentDOB.length != 10) {
      setDOBFilled(false);
    } else {
      setDOBFilled(true);
    }
  };

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", currentFirst);
      formData.append("last_name", currentLast);
      formData.append("phone_number", phoneNumberInt);
      formData.append("date_of_birth", currentDOB);

      console.log("Creating:", formData);

      const response = await fetch("http://localhost:5000/auth/sign-up", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      if (response.ok) {
        // account created
        console.log("Response received");
        const responseData = await response.json();
        // if account created
        if (responseData.SUCESS) {
          console.log("Account Created");
          return true;
        }
        // if error
        if (responseData.ERROR) {
          if ((responseData.ERROR === "First name must be greater than 2 characters.")) {
            setFirstFilled(false);
            console.log("Error: First Name must be greater than two characters");
          }
          if ((responseData.ERROR === "Last name must be greater than 2 characters.")) {
            setLastFilled(false);
            console.log("Error: Last name must be greater than 2 characters");
          }
          if ((responseData.ERROR === "Password must be over 12 characters.")) {
            setPhoneFilled(false);
            console.log("Error: Password must be over 12 characters");
          }
          return false;
        }
      }
    } catch (error) {
      console.error("Message Not Sent: ", error);
    }
  };

  const handleSubmit = async () => {
    // send Form to backend
    const result = await sendData();
    // reset all values
    console.log(result);
    if (result === true) {
      setCurrentFirst("");
      setCurrentLast("");
      setCurrentPhone("");
      setCurrentDOB("");
      setFirstFilled(true);
      setLastFilled(true);
      setPhoneFilled(true);
    }
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
              placeholder="(123)456-7890"
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
              placeholder="01/01/2002"
              value={currentDOB}
              style={{ borderColor: dobFilled ? "initial" : "red" }}
              onChange={handleDOBChange}
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
