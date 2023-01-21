import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../Search';
import UsersNav from './UsersNav';
import UserTweets from './UsersTweets';


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
      <h3>{user?.username}'s Profile</h3>
    {/* <div className='background'>

    </div> */}
    <div className='t-user' id='profile'>
    {user?.pic &&
        <img
            className='profile-pic-user'
            src={user?.pic}
            alt={user?.pic}
            />}
          {!user?.pic  &&
          <i className="fa-solid fa-circle-user" id="pic-user"></i>}
          </div>
          {/* <span className='name-box'>
          {user.username}
          <div className='name-at'>
          @{user.username}
          </div>
          </span> */}
          <UsersNav current='tweets' userId={userId}/>
          <UserTweets />
    </div>
  );
}
export default User;
