import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [displayNav, setDisplayNavr] = useState(false);

  // when user clicks on hamburger, either open or close the display
  const handleClickNav = () => {
    setDisplayNavr(!displayNav);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      // USE SQL TO FIND USER PROFILE
      console.log("Search For Name");
      navigate("/profiles");
    }
  };

  return (
    <nav className="navbar-body">
      <div className="navbar-container">
        <input
          type="text"
          placeholder="Search Volunteers Name"
          className={"navbar-input"}
          onKeyDown={handleEnter}
        />
        <div className="navbar-dynammicButton" onClick={handleClickNav}>
          <img
            src={"/hamburger.png"}
            className="navbar-image"
            alt="hamburger"
          />
        </div>

        <div className={`navbar-wrapper  ${displayNav && "displayed"}`}>
          <ul className={"navbar-wrapper-list"}>
            <li>
              <a
                onClick={() => navigate("/adminhome")}
                className={"navbar-wrapper-text"}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/adminhome")}
                className={"navbar-wrapper-text"}
              >
                Calendar
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/CreateVolunteer")}
                className={"navbar-wrapper-text"}
              >
                Create
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/ScheduleVolunteer")}
                className={"navbar-wrapper-text"}
              >
                Schedule
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/Reports")}
                className={"navbar-wrapper-text"}
              >
                Reports
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/")}
                className={"navbar-wrapper-text"}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
