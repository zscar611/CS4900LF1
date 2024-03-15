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

  const handleSubmit = () => {
    // check here if userName and password are in db
    // TODO add sql logic here
    if (currentUser === "Baggins")
    {
      navigate('/VolunteerHome');
      
    }
    else if (currentUser === "Admin")
    {
      // TODO add sql logic here
      navigate('/AdminHome');
    } else { console.log("nope");}
  };

  return (
    <div className="App">
      <header>
        <img src={'/logo.jpg'} className="main-img" alt="logo" />
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
