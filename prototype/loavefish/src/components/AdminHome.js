import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";

function AdminHome() {
  return (
    <div className="App">
      <Navbar />
      <h1>Admin Home</h1>
    </div>
  );
}

export default AdminHome;
