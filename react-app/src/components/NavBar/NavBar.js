import './NavBar.css';
import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.png';
import DemoLogin from '../auth/DemoLogin';
import TweetCreateForm from '../forms/createTweet';
import { Modal } from '../context/modal';
import LoginFormModal from '../forms/login';
import SignupFormModal from '../forms/signup';
import LoginForm from '../auth/LoginForm';
import { logout } from '../../store/session';
import SignUpForm from '../auth/SignUpForm';
import DemoLogin2 from '../auth/DemoLoginMobile';



const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [user]);



  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <nav>
      <div id="desktop">
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
    <Link onClick={() => setShowModal5(true)} className='logo'>
    <img className='logo' src={logo}/>
</Link>)}
{showModal5 && (
        <Modal onClose={() => setShowModal5(false)}>
          <TweetCreateForm setShowModal={setShowModal5} />
        </Modal>
      )}
        {isLoggedIn && 
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
          <i className="fa-solid fa-house"></i>   Home
          </NavLink>
        </li>}
        {isLoggedIn &&
        <li>
        <NavLink to='/about' exact={true} activeClassName='active'>
          <i className="fa-brands fa-github"></i>  About
          </NavLink>
        </li>}
        {!isLoggedIn &&
        <li>
        <NavLink to='/about2' exact={true} activeClassName='active'>
          <i className="fa-brands fa-github"></i>  About
          </NavLink>
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
          <NavLink to={`/users/${user?.id}`} exact={true} activeClassName='active'>
          <i className="fa-solid fa-user"></i>   My Profile
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
      </div>



      <div id="bars">
    <ul>


{!isLoggedIn && (
<Link onClick={() => setShowModal3(true)} className='logo'>
    <img className='logo' src={logo}/>
</Link>)}
{showModal3 && (
  <Modal onClose={() => setShowModal3(false)}>
        <LoginForm setShowModal={setShowModal3} />
  </Modal>)}
  {isLoggedIn && (
    <Link onClick={() => setShowModal4(true)} className='logo'>
    <img className='logo' src={logo}/>
</Link>)}
{showModal4 && (
        <Modal onClose={() => setShowModal4(false)}>
          <TweetCreateForm setShowModal={setShowModal4} />
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
        <NavLink to='/about2' exact={true} activeClassName='active'>
          <i className="fa-brands fa-github"></i></NavLink>
        </li>}
  {!isLoggedIn && 
  <li>
   <Link
        onClick={() => setShowModal6(true)}
      >
      <i className="fa-solid fa-arrow-right-to-bracket"></i></Link>
      {showModal6 && (
        <Modal onClose={() => setShowModal6(false)}>
          <LoginForm setShowModal={setShowModal6} />
        </Modal>
      )}
  </li>}
  {!isLoggedIn &&
  <li>
    <Link
        onClick={() => setShowModal7(true)}
      >
      <i className="fa-solid fa-user-plus"></i></Link>
      {showModal7 && (
        <Modal onClose={() => setShowModal7(false)}>
          <SignUpForm setShowModal={setShowModal7} />
        </Modal>
      )}
  </li>}
    {!isLoggedIn &&
  <li>
   <DemoLogin2 />
  </li>}
  {/* {isLoggedIn &&
  <li>
    <NavLink to='/users' exact={true} activeClassName='active'>
    <i className="fa-solid fa-users"></i>   Users
    </NavLink>
  </li>} */}
  {isLoggedIn &&
  <li>
    <NavLink to={`/users/${user?.id}`} exact={true} activeClassName='active'>
    <i className="fa-solid fa-user"></i></NavLink>
  </li>}
  {isLoggedIn && 
  <li>
              <Link onClick={onLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i></Link> 
  </li>}
  </ul>
    </div>

    </nav>
  );
}

export default NavBar;
