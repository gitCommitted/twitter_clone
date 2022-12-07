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

  const userComponents = users.map((user) => {
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
        <Link onClick={() => setShowModal(true)} className='user-box'>
        
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
          </Link>
          </li>}
          {showModal && (
        <Modal onClose={() => setShowModal(false)}>
              <LoginForm setShowModal={setShowModal}/>
        </Modal>)}
      
      </div>
     
    );
  });


  return (
    <div id='user-feature'>
      <h3 className='userh3'>User List </h3>
      <ul>{userComponents}</ul>
    </div>
  );
}

export default UsersList;
