import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./TimeAutonomous.css";
import Navbar from "./Navbar.js";

// array of people schedulded for today but not checked in
// array of people checked in
// display all, display building/external, display area based
// columns, name, location, time
// check in or check out button
// check out will ask are you sure

function TimeAuto() {
  const navigate = useNavigate();
  //const [checkIn, setCheckedIn] = useState([]);
  //const [checkOut, setCheckOut] = useState([]);

  const [signInDict, setSignInDict] = useState([
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
      name: "Pete Rose",
      area: "Home Deliveries",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Luca Modric",
      area: "Call Center",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Lebron James",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Justin Verlander",
      area: "Home Deliveries",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Miguel Cabrera",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Billy Beane",
      area: "Warehouse",
      timeScheduled: "10:30am - 11:30am",
    },
  ]);
  const [signOutDict, setSignOutDict] = useState([
    {
      name: "Tom Brady",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Bilbo Baggins",
      area: "Warehouse",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Frodo Baggins",
      area: "Home Deliveries",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Sam Gamgee",
      area: "Call Center",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Dwight Shrute",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Wes Anderson",
      area: "Home Deliveries",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Tim Healey",
      area: "Pantry",
      timeScheduled: "10:30am - 11:30am",
    },
    {
      name: "Billy Zoto",
      area: "Warehouse",
      timeScheduled: "10:30am - 11:30am",
    },
  ]);

  const signIn = (person) => {
    console.log(person);
    // send JSON to backend checking in person
    setSignOutDict((prevSignOutDict) => [...prevSignOutDict, person]);
    setSignInDict((prevSignInDict) =>
      prevSignInDict.filter((p) => p !== person)
    );
  };

  const signOut = (person) => {
    console.log(person);
    // send JSON to backend checking in person
    setSignOutDict((prevSignOutDict) =>
      prevSignOutDict.filter((p) => p !== person)
    );
  };

  const handleLogout = () => {
    // TODO insert SQL logic here
    navigate("/");
  };

  const exitAuto = () => {
    // TODO insert SQL logic here
    navigate("/timesheet");
  };

  return (
    <div className="App">
      <div className="admin-top-text">
        <h1>Volunteer Time Sheet</h1>
      </div>
      <button onClick={exitAuto}>Exit Autonomous Mode</button>
      <div className="time-style">
        <div className="row">
          <div className="column">
            <h2>Sign In</h2>
            <ul>
              {signInDict.map((person, index) => (
                <div className="admin-person" key={index}>
                  <p className="admin-text">
                    {person.name}
                  </p>
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
              {signOutDict.map((person, index) => (
                <div className="admin-person" key={index}>
                  <p className="admin-text">{person.name}</p>
                  <p>{person.area}</p>
                  <p>{person.timeScheduled}</p>
                  <button onClick={() => signOut(person)}>Sign Out</button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeAuto;
