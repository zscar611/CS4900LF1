import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./TimeSheet.css";
import Navbar from "./Navbar.js";

// array of people schedulded for today but not checked in
// array of people checked in
// display all, display building/external, display area based
// columns, name, location, time
// check in or check out button
// check out will ask are you sure

function TimeSheet() {
  const navigate = useNavigate();
 

//TODO: GET SHIFT ENTRIES WITH A TIME WITHIN 15 MINS OF CURRENT TIME AND SIGNEDIN = 0 &

  const [signInDict, setSignInDict] = useState([]);
  const [signOutDict, setSignOutDict] = useState([]);
  const [signInDict2, setSignInDict2] = useState([]);
  const [allAccounts, setAllAccounts] = useState([]);
  var currentShiftID = 0;
  
  //GETS ALL VOLUNTEERS SCHEDULED TODAY THAT HAVEN'T SIGNED IN
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/shift/scheduledToday", {
          method: "GET",
          mode: "cors",
        });
        if (response.ok) {
          const allUsers = await response.json();
      
          console.log("All users:", allUsers);
          setAllAccounts([]);
          setSignInDict2([]);
          setSignInDict([]);
          allUsers.forEach((user) => {
            console.log(user["full_name"]);
            setAllAccounts((prevAllAccounts) => [...prevAllAccounts, user]);
          });
        } else {
          console.error("Error fetching all users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    //adds names to fullNameList
    for(let i = 0; i < allAccounts.length; i++)
      {
        
        signInDict2.push(             
        
        {name: allAccounts[i]["full_name"],
         area: allAccounts[i]["activity"],
         timeScheduled: (allAccounts[i]["time_in"] + " - " + allAccounts[i]["time_out"]),
         shiftid:  allAccounts[i]["id"],
         volunteerid: allAccounts[i]["volunteer"],
         date: allAccounts[i]["date"]	
          
        })	
         
      }	
      setSignInDict(signInDict2)
    };
    getData();
  },[]);
  
  //gets scheduled shift data from DB
	const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/shift/scheduledToday", {
        method: "GET",
        mode: "cors",
      });
      if (response.ok) {
        const allUsers = await response.json();
		
        console.log("All users:", allUsers);
        setAllAccounts([]);
        setSignInDict2([]);
        setSignInDict([]);
        allUsers.forEach((user) => {
          console.log(user["full_name"]);
          setAllAccounts((prevAllAccounts) => [...prevAllAccounts, user]);
        });
      } else {
        console.error("Error fetching all users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
	//adds names to fullNameList
	for(let i = 0; i < allAccounts.length; i++)
		{
			
			signInDict2.push(             
			
			{name: allAccounts[i]["full_name"],
			 area: allAccounts[i]["activity"],
			 timeScheduled: (allAccounts[i]["time_in"] + " - " + allAccounts[i]["time_out"]),
			 shiftid:  allAccounts[i]["id"],
			 volunteerid: allAccounts[i]["volunteer"],
			 date: allAccounts[i]["date"]	
				
			})	
			 
		}	
		setSignInDict(signInDict2)
  };
	
console.log(signInDict);
	
	



//SENDS SHIFT ID TO DB TO CHECK IN
	const checkIn = async () => {
    try {
	  const formData = new FormData();
	 
	  formData.append("id", currentShiftID);

    // if in group send currentGroup

	  console.log("Creating:", formData);
	

	//TODO CHANGE ROUTE
      const response = await fetch("http://localhost:5000/shift/activate", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
	  
    } catch (error) {
      console.error("Error: ", error);
    }
  };
	
	
	
	
//SENDS SHIFT ID TO DB TO CHECK OUT
	const checkOut = async () => {
    try {
	  const formData = new FormData();
	 
	  formData.append("id", currentShiftID);

    // if in group send currentGroup

	  console.log("Creating:", formData);


	//TODO CHANGE ROUTE
      const response = await fetch("http://localhost:5000/shift/checkout", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
	  
    } catch (error) {
      console.error("Error: ", error);
    }
  };	
	
	
	
	
	
	
	


 //ACTIVATES ON SIGN IN BUTTON CLICK CALLS DB REQUEST
  const signIn = (person) => {
    console.log(person);
	
	//SETS SHIFT ID TO SEND TO BACKEND
	currentShiftID = person.shiftid;
	checkIn();
    setSignOutDict((prevSignOutDict) => [...prevSignOutDict, person]);
    setSignInDict((prevSignInDict) =>
    prevSignInDict.filter((p) => p !== person)
    );
  };



 //ACTIVATES ON SIGN OUT BUTTON CLICK CALLS DB REQUEST
  const signOut = (person) => {
    console.log(person);
	currentShiftID = person.shiftid;
	checkOut();

    setSignOutDict((prevSignOutDict) =>
      prevSignOutDict.filter((p) => p !== person)
    );
  };





  // if name is clicked open the volunteers profile
  const openProfile = (person) => {
    // send data to back end and navigate to profile js
    let dataVar = [person.name];
    navigate('/profiles', { state: { data: dataVar } });
  };



  return (
    <div className="App">
      <Navbar />
      <div className="admin-top-text">
        <h1>Volunteer Time Sheet</h1>
      </div>
      <div className="time-style">
        <div className="row">
          <div className="column">
            <h2>Sign In</h2>
			<button onClick={() => getData()}>Refresh</button>
			
            <ul>
              {signInDict.map((person, index) => (
                <div className="admin-person" key={index}>
                  <p className="admin-text" onClick={() => openProfile(person)}>
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

export default TimeSheet;
