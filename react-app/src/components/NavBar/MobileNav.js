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
import MobileNavModal from './MobileNavModal';




const MobileNav = () => {
  const user = useSelector((state) => state.session.user);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [user]);

  return (
    <div id="bars">
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
    <Link onClick={() => setShowModal(true)} className='logo'>
    <img className='logo' src={logo}/>
</Link>)}
{showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TweetCreateForm setShowModal={setShowModal} />
        </Modal>
      )}
  {isLoggedIn && 
  <li>
    <NavLink to='/home' exact={true} activeClassName='active'>
    <i className="fa-solid fa-house"></i></NavLink>
  </li>}
  {isLoggedIn &&
  <li>
  <NavLink to='/about' exact={true} activeClassName='active'>
    <i className="fa-brands fa-github"></i></NavLink>
  </li>}
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
  {/* {isLoggedIn &&
  <li>
    <NavLink to='/users' exact={true} activeClassName='active'>
    <i className="fa-solid fa-users"></i>   Users
    </NavLink>
  </li>} */}
  {isLoggedIn &&
  <li>
    <NavLink to='/profile' exact={true} activeClassName='active'>
    <i className="fa-solid fa-user"></i></NavLink>
  </li>}
  {isLoggedIn && 
  <li>
    <Link
        onClick={() => setShowModal(true)}
      >
      <i className="fa-solid fa-arrow-right-to-bracket"></i>  Log In
      </Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
  </li>}
  </ul>
    </div>
  );
}

export default MobileNav;