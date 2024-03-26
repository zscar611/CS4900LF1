import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";
import "./Profiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

function Profiles() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const location = useLocation();
  const [data, setData] = useState("");
  const todayDate = new Date();
  const [upcomingShifts, setUpcomingShifts] = [];
  const [nextShift, setNextShift] = useState("");
  const [lastShift, setLastShift] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      console.log("IN PROFILE", location.state.data);
      setUserName(location.state.data[0]);
      setUserId(location.state.data[1]);
    }
  }, [location]);

  const openDeleteModal = () => {
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteOpen(false);
  };

  const handleDeleteUser = () => {
    console.log("Delete");
    
  };

  return (
    <div className="App">
      <Navbar />
      <div className="profile-name-container">
        <h1>{userName}</h1>
      </div>
      <div className="profile-style">
        <div className="profile-statBox">
          <div className="profile-icons">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="profile-icons-element"
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={openDeleteModal}
              className="profile-icons-element"
            />
          </div>
          {deleteOpen && (
            <div className="profiles-modal">
              <div className="profiles-modal-box">
                <p>
                  Are you sure you want to delete the account for {userName},
                  Deleting will permantely delete the account off the database,
                  and is NOT reversible
                </p>
                <div className="profile-button">
                  <button
                    className="profile-button-box"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
                <div className="profile-button">
                  <button
                    className="profile-button-box-delete"
                    onClick={handleDeleteUser}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          <p className="profile-text">Next Shift:</p>
          <p className="profile-text">Last Shift: </p>
          <p className="profile-text">Groups: {location.state.data[0].group}</p>
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
