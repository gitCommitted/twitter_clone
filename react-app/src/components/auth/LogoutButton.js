import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  // useEffect(() => {
  //   dispatch(logout())
  //   }, [dispatch]);

  // return <button onClick={onLogout}>Logout</button>;

return (
    <div>
       
          <Link onClick={onLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>   Logout
          </Link> 
          
    </div>
)
};

export default LogoutButton;
