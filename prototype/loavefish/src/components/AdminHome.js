import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";
import "./AdminHome.css";
function AdminHome() {
  const today = new Date();
  // get data for every person schedulded that day
  // need data for number of current and future volunteers in total
  // need data for number of current and future volutneers by area
  // need names of each volunteer by area
  const getVolunteerData = () => {};

  return (
    <div className="App">
      <Navbar />
      <h1>Admin Home</h1>
      <div className="row">
        <div className="column">
          <div className="adminHome-box">
            <h2>
              Today: {today.getMonth()} / {today.getDate()} /{" "}
              {today.getFullYear()}
            </h2>
            <p>Current Volunteers: 10</p>
            <p>Current in Building: 7</p>
            <p>Current Outside: 3</p>
            <p>Todays Volunteers: 45</p>
          </div>
        </div>
        <div className="column">
          <div className="adminHome-box">
            <h2>Warehouse</h2>
            <p>Current Volunteers: 3</p>
            <p>Todays Volunteers: 5</p>
            <p>Checked In: Charles Leclerc, Max Verstappen, Lewis Hamilton</p>
          </div>
        </div>
        <div className="column">
          <div className="adminHome-box">
            <h2>Pantry</h2>
            <p>Current Volunteers: 1</p>
            <p>Todays Volunteers: 9</p>
            <p>Checked In: Carlos Sainz, George Russell, Alex Albon</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <div className="adminHome-box">
            <h2>Call Center</h2>
            <p>Current Volunteers: 4</p>
            <p>Current in Building: 6</p>
            <p>Checked In: Yuki Tsunoda, Daniel Ricciardo, Pierre Gasly</p>
          </div>
        </div>
        <div className="column">
          <div className="adminHome-box">
            <h2>Home Delivery</h2>
            <p>Current Volunteers: 2</p>
            <p>Todays Volunteers: 3</p>
            <p>Checked In: Charles Leclerc, Max Verstappen, Lewis Hamilton</p>
          </div>
        </div>
        <div className="column">
          <div className="adminHome-box">
            <h2>Front Desk</h2>
            <p>Current Volunteers: 1</p>
            <p>Todays Volunteers: 3</p>
            <p>Checked In: Charles Leclerc, Max Verstappen, Lewis Hamilton</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
