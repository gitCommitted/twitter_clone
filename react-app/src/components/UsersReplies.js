import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TweetListItem from './tweet/tweetListItem';
import UsersNav from './UsersNav';
import { useSelector, useDispatch} from 'react-redux';
import { fetchGetUserRepliesById, getUserRepliesById } from '../store/reply';
import Reply2 from './reply/index2'
import Search from '../Search'


function UserReplies() {
    const tweets = Object.values(useSelector((state) => state.tweets?.all_tweets ? state.tweets.all_tweets : state.tweets));
    const replies = Object.values(useSelector((state) => state.replies?.user_replies_by_id ? state.replies.user_replies_by_id : state.replies));
    const { userId }  = useParams();
    const [user, setUser] = useState({});
    const [userReplies, setUserReplies] = useState({});
    const dispatch = useDispatch();
    const refreshReplies = () => {
        dispatch(fetchGetUserRepliesById(userId));
        }

  useEffect(() => {
    refreshReplies();
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
  

    const rlist = (reply) => {
        return (
            <div id="prof-list">
                <Reply2 reply={reply}   />
            </div>
        )}
    // const repliesRes = userReplies.filter((reply) => reply.userId == userId);

  return (
  
    <div id='mid'>
       <Search />
      <h3>User Profile</h3>
    
    <div className='t-user' id='profile'>
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
          </span></div>
          <UsersNav current='replies' userId={userId}/>
    {replies.length > 0 ?
    
    replies.map((reply) => {
             console.log(reply)  
            return rlist(reply)    
                
            }) :
            <div className='userD'>
                <h3>No Replies Yet</h3>
            </div>
    }
    
    </div>   
    
    


    );
}
export default UserReplies;