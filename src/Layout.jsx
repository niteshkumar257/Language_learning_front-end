import React, { useEffect, useState } from 'react';
import './Layout.css';
import Navbar from './component/Navbar/Navbar';
import jwtDecode from 'jwt-decode';

const Layout = ({ children }) => {
  const token = localStorage.getItem('auth-token');


  useEffect(() => {
    // Get the token from local storage
   
    
  },[token])

  return (
    <div className='layout-container'>
      <div className="top-container">
        {token!=null && <Navbar />}
      </div>
      <div className="bottom-container">
        {children}
      </div>
    </div>
  )
}

export default Layout;
