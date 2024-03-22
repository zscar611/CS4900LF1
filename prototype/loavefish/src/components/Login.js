import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();
  // declare variables
  const [currentUser, setCurrentUser] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [submit, setSubmit] = useState(false);
  // change username as user types 
  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
  };
  // change password as user types 
  const handlePassChange = (event) => {
    setCurrentPass(event.target.value);
  };

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append("phone_number", currentUser);
      formData.append("password", currentPass);

      console.log("Creating:", formData);

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        mode: "cors",
        body: formData,
      });
      if (response.ok) {
        
        console.log("Response received");
        const responseData = await response.json();
        // if logged in
        if (responseData.SUCCESS) {
          console.log("Logged In");
          return true;
        }
        // if error
        if (responseData.ERROR) {
          console.log(responseData.ERROR)
          
          return false;
        }
      }
    } catch (error) {
      console.error("Message Not Sent: ", error);
    }
  };



  const handleSubmit = async () => {
    // check here if userName and password are in db
    // TODO add sql logic here

    const result = await sendData();
    if(currentUser === "Admin")
    {
      navigate('/AdminHome');
    }
    else if(currentUser === "Baggins")
    {
      navigate('/AdminHome');
    }
    else if (result === true)
    {
      if (currentUser === "Admin")
      {
        navigate('/AdminHome');
      }
      else
      {
        // TODO add sql logic here
        navigate('/VolunteerHome');
      } 
      
    }else { console.log("Error");}

  };

  

  return (
    <div className="App">
      <header>
        <img src={'/logo-Burned.png'} className="main-img" alt="logo" />
      </header>
      <h1>Login</h1>
      <div className='main-input'>
        <input
          type="text"
          placeholder="Enter last name"
          value={currentUser}
          onChange={handleUserChange}
          className={"main-input-box"}
        />
      </div>
      <div className='main-input'>
        <input
          type="password"
          placeholder="Enter phone number"
          value={currentPass}
          onChange={handlePassChange}
          className={"main-input-box"}
        />
      </div>

      <div className="main-button">
        <button className="main-button-box" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
