import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Reports.css";
import Navbar from "./Navbar.js";

function Report() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
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

  return (
    <div className="App">
      <Navbar />
      <h1>Reports</h1>
      <div className="report-align-items">
        <h1>This Weeks Report</h1>
        <div className="main-button">
          <button
            className="main-button-box"
            style={{ display: "flex" }}
            onClick={getData}
          >
            Generate
          </button>
        </div>
      </div>
      <div className="adminHome-style">
        <div className="row">
          <div className="column">
            <ul>
              <div className="admin-person">
                <p className="admin-text">All Accounts: </p>
                {allAccounts.map((person, index) => (
                  <p className="admin-text" key={index}>
                    {person.first_name} {person.last_name} {person.phone_number}
                  </p>
                ))}
                <p className="admin-text">Total Accounts: {allAccounts.length}</p>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
