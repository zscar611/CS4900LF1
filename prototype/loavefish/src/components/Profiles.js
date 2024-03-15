import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";
import "./Profiles.css";

function Profiles() {
  // get data for inidivual person
  const getVolunteerData = () => {};

  return (
    <div className="App">
      <Navbar />
      <h1>Persons Name Profile</h1>
    </div>
  );
}

export default Profiles;
