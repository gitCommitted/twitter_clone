import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import LoginForm from './auth/LoginForm';
import {Modal} from './context/modal';

function UsersList() {
  const [users, setUsers] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = (user) => {
    return (
      <div>
        {sessionUser &&
          <li key={user.id}  className='user-box'>
        <NavLink to={`/users/${user.id}`} className='user-box'>
        {user?.pic &&
        <img
            className='profile-pic'
            src={user?.pic}
            alt={user?.pic}
            />}
          {!user?.pic  &&
          <i className="fa-solid fa-circle-user"></i>}
          <span className='name-box'>
          {user.username}
          <div className='name-at'>
          @{user.username}
          </div>
          </span>
          </NavLink>
          </li> }
          {!sessionUser &&
          <li key={user.id}  className='user-box'>
        {user?.pic &&
        <img
            className='profile-pic'
            src={user?.pic}
            alt={user?.pic}
            />}
          {!user?.pic  &&
          <i className="fa-solid fa-circle-user"></i>}
          <span className='name-box'>
          {user.username}
          <div className='name-at'>
          @{user.username}
          </div>
          </span>
          </li>
          }
      </div>
    );
  };
  const userComponents2 = (user) => {
    return (
      <div>
        {sessionUser &&
          <li key={user.id}  className='user-box'>
        {user?.pic &&
        <img
            className='profile-pic'
            src={user?.pic}
            alt={user?.pic}
            />}
          {!user?.pic  &&
          <i className="fa-solid fa-circle-user"></i>}
          <span className='name-box'>
          {user.username}
          <div className='name-at'>
          @{user.username}
          </div>
          </span>
          </li> }
          {!sessionUser &&
          <li key={user.id}  className='user-box'>
        {user?.pic &&
        <img
            className='profile-pic'
            src={user?.pic}
            alt={user?.pic}
            />}
          {!user?.pic  &&
          <i className="fa-solid fa-circle-user"></i>}
          <span className='name-box'>
          {user.username}
          <div className='name-at'>
          @{user.username}
          </div>
          </span>
          </li>
          }
      </div>
    );
  };


  return (
    <div id='user-feature'>
      {sessionUser && 
      <div>
      <h3 className='userh3'>Other Users To Watch</h3>
      <ul>
        {
          users.map(user => {
            if(user.id !== sessionUser.id) {
            return userComponents(user)
            }
          })
        }
      </ul>
      </div>
      }
       {!sessionUser && 
      <div>
        <Link className='login-link' onClick={() => setShowModal(true)}>
      <h3 className='userh3'>Who's on i-tweet?</h3>
      <ul>{
      users.map(user => userComponents2(user))
      }</ul>
      </Link>
      </div>
      }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
              <LoginForm setShowModal={setShowModal}/>
        </Modal>)}
    </div>
  );
}

export default UsersList;
