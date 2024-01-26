import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  return  (
    <>
      <nav classname='navbar'>
        <div className='navbar-wrapper'>
          <ul className='nav-item'>
            <a onClick={()=>navigate('/Dashboard')} className='navbar-text'>
              Home
            </a>
          </ul>
          <ul className='nav-item'>
            <a className='navbar-text'>Calendar</a>
          </ul>
          <ul className='nav-item'>
            <a className='navbar-text'>Scheduling</a>
          </ul>
          <ul className='nav-item'>
            <a className='navbar-text'>Reports</a>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
