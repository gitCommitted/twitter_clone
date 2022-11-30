import './NavBar.css';
import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import DemoLogin from '../auth/DemoLogin';
import TweetCreateForm from '../forms/createTweet';
import { Modal } from '../context/modal';
import LoginFormModal from '../forms/login';
import SignupFormModal from '../forms/signup';
import LoginForm from '../auth/LoginForm';



const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [user]);

  return (
    <nav>
      <ul>
      {!isLoggedIn && (
      <Link onClick={() => setShowModal2(true)} className='logo'>
          <img className='logo' src={logo}/>
      </Link>)}
      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)}>
              <LoginForm setShowModal={setShowModal2} />
        </Modal>)}
        {isLoggedIn && (
      <NavLink to="/login" className='logo'>
          <img className='logo' src={logo}/>
      </NavLink>)}
        {isLoggedIn && 
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>}
        <li>
          <Link onClick={() => window.open('https://github.com/gitCommitted/twitter_clone')}>
            About
          </Link>
        </li>
        {!isLoggedIn && 
        <li>
          <LoginFormModal />
        </li>}
        {!isLoggedIn &&
        <li>
          <SignupFormModal />
        </li>}
        {!isLoggedIn && 
        <li>
          <DemoLogin />
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
        {isLoggedIn && 
        <div className='tweetButton'>
        <button onClick={() => setShowModal(true)}>Tweet</button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <TweetCreateForm setShowModal={setShowModal} />
              </Modal>
            )}
            </div>}
      
    </nav>
  );
}

export default NavBar;
