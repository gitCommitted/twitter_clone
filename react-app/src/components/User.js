import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../Search';
import UsersNav from './UsersNav';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div id='mid'>
      <Search />
      <h3>User Profile</h3>
    <UsersNav current='deets' userId={userId}/>
    <ul className='userD'>
      <li>
      {user?.pic &&
        <img
            className='profile-pic'
            src={user?.pic}
            alt={user?.pic}
            />}
      {!user?.pic  &&
          <i className="fa-solid fa-circle-user"></i>}
      </li>
      <li>
        <strong>User Id: </strong> {userId}
      </li>
      <li>
        <strong>Username: </strong> {user.username}
      </li>
      <li>
        <strong>Email: </strong> {user.email}
      </li>
    </ul>
    </div>
  );
}
export default User;
