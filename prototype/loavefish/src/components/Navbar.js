import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [displayNav, setDisplayNavr] = useState(false);
  const fullNameList = [];
  const idList = [];
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState("");

  //gets name data from DB
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
  //adds names to fullNameList
  for (let i = 0; i < allAccounts.length; i++) {
    fullNameList.push(
      allAccounts[i]["first_name"] + " " + allAccounts[i]["last_name"]
    );
    idList.push(allAccounts[i]["id"]);
  }

  // updates name
  const handleNameChange = (event) => {
    getData();
    document.getElementById("fullNamesList").innerHTML = fullNameList
      .map((name) => `<option>${name}</option>`)
      .join("");
    setCurrentName(event.target.value);
    // if event.target.value is matches a name in list, link ID
    if (fullNameList.includes(event.target.value)) {
      // find index of where name is
      const index = fullNameList.indexOf(event.target.value);
      // use name index to find id index
      const matchedId = idList[index];
      setCurrentId(matchedId);
    } else {
      setCurrentId("");
    }
  };

  // when user clicks on hamburger, either open or close the display
  const handleClickNav = () => {
    setDisplayNavr(!displayNav);
  };

  const handleEnter = async (event) => {
    if (event.key === "Enter") {
      // USE SQL TO FIND USER PROFILE
      console.log("Search For Name");
      let dataVar = [currentName, currentId];
      navigate('/profiles', { state: { data: dataVar } });
    }
  };

  return (
    <nav className="navbar-body">
      <div className="navbar-container">
        <input
          type="text"
          list="fullNamesList"
          placeholder="Search Volunteers Name"
          className={"navbar-input"}
          onKeyDown={handleEnter}
          onChange={handleNameChange}
        />
        <datalist id="fullNamesList"></datalist>

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
                onClick={() => navigate("/TimeSheet")}
                className={"navbar-wrapper-text"}
              >
                Time
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/Calendar")}
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
