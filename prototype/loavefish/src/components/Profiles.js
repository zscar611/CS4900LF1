import React, { useState } from "react";
import Navbar from "./Navbar";
import "./App.css";
import "./Profiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Profiles() {
  // get data for inidivual person
  const getVolunteerData = () => {};

  return (
    <div className="App">
      <Navbar />
      <div className="profile-name-container">
        <h1>MARK ZUCKERBERG</h1>
      </div>
      <div className="profile-style">
        <div className="profile-statBox">
          <div className="profile-icons">
            <FontAwesomeIcon icon={faPenToSquare} className="profile-icons-element"/>
            <FontAwesomeIcon icon={faTrash} className="profile-icons-element"/>
          </div>
          <p className="profile-text">Next Shift: Pantry - 4/12/2024</p>
          <p className="profile-text">Last Shift: Warehouse - 02/10/2024</p>
          <p className="profile-text">Groups: WMU</p>
          <p className="profile-text">Total Hours: 60 hours</p>
          <p className="profile-text">Yearly Hours: 30 hours</p>
          <p className="profile-text">Total Shifts: 12</p>
          <p className="profile-text">Yearly Shifts: 6</p>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
