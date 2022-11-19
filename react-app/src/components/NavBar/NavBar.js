import './NavBar.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';



const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [user]);

  return (
    <nav>
      <ul>
      <NavLink to="/" className='logo'>
          <img className='logo' src={logo}/>
      </NavLink>
        {isLoggedIn && 
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>}
        {!isLoggedIn && 
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>}
        {!isLoggedIn &&
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>}
        {isLoggedIn &&
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>}
        {isLoggedIn &&
        <li>
          <NavLink to='/profile' exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>}
        {isLoggedIn && 
        <li>
          <LogoutButton />
        </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
