import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

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
      </li>
    );
  });

  return (
    <div id='mid'>
      <h3>User List </h3>
      <ul>{userComponents}</ul>
    </div>
  );
}

export default UsersList;
