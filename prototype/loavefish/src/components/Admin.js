import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Admin.css";
import Navbar from "./Navbar.js";

// array of people schedulded for today but not checked in
// array of people checked in
// display all, display building/external, display area based
// columns, name, location, time
// check in or check out button
// check out will ask are you sure

function Admin() {
  const navigate = useNavigate();
  //const [checkIn, setCheckedIn] = useState([]);
  //const [checkOut, setCheckOut] = useState([]);

  const signInDict = [
    {
      name: "Lionel Messi",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Kylian Mbappe",
      area: "Warehouse",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Lionel Messi",
      area: "Home Deliveries",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Luca Modric",
      area: "Call Cener",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Lebron James",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Kylian Mbappe",
      area: "Home Deliveries",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Lionel Messi",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Kylian Mbappe",
      area: "Warehouse",
      timeScheduled: "10:30am - 11:30am",
    },
  ];

  const signIn = (person) => {
    console.log(person);
  };

  const handleLogout = () => {
    // TODO insert SQL logic here
    navigate("/");
  };
  return (
    <div className="App">
      <Navbar />
      <div className="admin-top-text">
        <h1>Volunteer Time Sheet</h1>
      </div>
      <div className="row">
        <div className="column">
          <h2>Sign In</h2>
          <ul>
            {signInDict.map((person, index) => (
              <div className="admin-person" key={index}>
                <p>{person.name}</p>
                <p>{person.area}</p>
                <p>{person.timeScheduled}</p>
                <button onClick={() => signIn(person)}>Sign In</button>{" "}
              </div>
            ))}
          </ul>
        </div>

        <div className="column">
          <h2>Sign Out</h2>
          <ul>
            {signInDict.map((person, index) => (
              <div className="admin-person" key={index}>
                <p>{person.name}</p>
                <p>{person.area}</p>
                <p>{person.timeScheduled}</p>
                <button>Sign Out</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;
