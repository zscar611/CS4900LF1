import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
  };

  const handlePassChange = (event) => {
    setCurrentPass(event.target.value);
  };

  const handleSubmit = () => {
    // check here if userName and password are in db
    if (currentUser === "Baggins")
    {
      console.log("works");
      navigate('/Dashboard');
      
    }
    else if (currentUser === "Admin")
    {
      navigate('/Admin');
    } else { console.log("nope");}
  };

  return (
    <div className="App">
      <header>
        <img src={'/logo.jpg'} className="main-img" alt="logo" />
      </header>
      <p className='main-input-text'>Enter Last Name:</p>
      <input className='main-input'
        type="text"
        placeholder="last name"
        value={currentUser}
        onChange={handleUserChange}
      />
      <p className='main-input-text'>Enter Phone number:</p>
      <input className='main-input'
        type="password"
        placeholder="phone number"
        value={currentPass}
        onChange={handlePassChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
