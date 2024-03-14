import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  return  (
    <>
      <nav>
        <div className='navbar-wrapper'>
          <ul>
            <a onClick={()=>navigate('/adminhome')} className='navbar-text'>
              Home
            </a>
          </ul>
          <ul>
            <a onClick={()=>navigate('/timesheet')} className='navbar-text'>Time Sheet</a>
          </ul>
          <ul>
            <a className='navbar-text'>Calendar</a>
          </ul>
          <ul>
            <a onClick={()=>navigate('/VolunteerAdd')} className='navbar-text'>Scheduling</a>
          </ul>
          <ul>
            <a onClick={()=>navigate('/Reports')} className='navbar-text'>Reports</a>
          </ul>
			<ul>
            <a onClick={()=>navigate('/')} className='navbar-text'>Logout</a>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
