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
        <h1 className="profile-header">MARK ZUCKERBERG</h1>
        <div className="profile-icons">
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      <div className="adminHome-style">
        <div className="row">
          <div className="column">
            <ul>
              <div className="profile-statBox">
                <p className="profile-text">Next Shift: </p>
                <p className="profile-text">Last Shift: </p>
                <p className="profile-text">Total Hours: </p>
                <p className="profile-text">Yearly Hours: </p>
                <p className="profile-text">Total Shifts: </p>
                <p className="profile-text">Yearly Shifts: </p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
