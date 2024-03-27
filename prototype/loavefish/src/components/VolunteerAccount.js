import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faCaretRight,
  faRightFromBracket,
  faTrash,
  faPenToSquare,
  faUser,
  faHome
} from "@fortawesome/free-solid-svg-icons";

function VolunteerAccount() {
    let firstName = "ryan";
    let lastName = "frederick"
    const navigate = useNavigate();

    const handleLogout = async () => {
    navigate("/");
  };

  const navigateHome = async () => {
    navigate("/VolunteerHome");
  };

  const sendRequest = async () => {
    console.log("GET THE DATA");
    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      console.log("Creating:", formData);

      const response = await fetch("http://localhost:5000/auth/userPassword", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      if (response.ok) {
        
        console.log("Response received");
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.error("Message Not Sent: ", error);
    }
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
      <div className="profile-name-container">
        <h1>Account Info</h1>
      </div>
      <div className="volunteerHome-buttonTopScreen">
        <button
          className="volunteerHome-button-boxTopScreen"
          onClick={navigateHome}
        >
          <FontAwesomeIcon icon={faHome} className="profile-icons-element" />
          Home
        </button>
      </div>

      <div className="volunteerHome-buttonTopScreen">
        <button className="volunteerHome-button-boxTopScreen">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="profile-icons-element"
            onClick={sendRequest}
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
      <div className="profile-style">
        <div className="profile-statBox">
          <p className="profile-text">First Name:</p>
          <p className="profile-text">Last Name: </p>
          <p className="profile-text">Phone Number:</p>
          <p className="profile-text">Password:</p>
          <p className="profile-text">Account ID:</p>
        </div>
      </div>
    </div>
  );
}

export default VolunteerAccount;
