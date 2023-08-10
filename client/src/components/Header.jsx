import React from 'react';
import {useContext, useEffect, useState} from "react";
import { UserContext,UserContextProvider} from './UserContext';
import { Link } from 'react-router-dom';






function Header() {

  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
       setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  
  const username= userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo navbar-brand">AniBlog</Link>
      <nav className='navbar'>
  
      
      {username && (
          <>
            <Link to="/create">Create</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      
        
      </nav>
    </header>
  );
}

export default Header