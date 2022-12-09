import './profile.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchUserTweets } from '../../store/tweets';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TweetListItem from '../tweet/tweetListItem';
import { fetchGetUserReplies } from '../../store/reply';
import Reply from '../reply';

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweets = Object.values(useSelector((state) => state.tweets?.user_tweets ? state.tweets.user_tweets : state.tweets));
    const replies = Object.values(useSelector((state) => state.replies?.user_replies ? state.replies.user_replies : state.replies));
    const [tweet, setTweet] = useState('');
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const refreshTweet = () => {
        dispatch(fetchUserTweets());
        }
    const refreshReply = () => {
        dispatch(fetchGetUserReplies());
        }
    useEffect(() => {
        refreshTweet();
        refreshReply();
        // dispatch(fetchUserTweets()).catch(async (res) => {
        //     console.log('res= ', res)
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    }, [dispatch]);
console.log()
    return (
        <div id='mid'>
            <h3>My Profile</h3>
    <ul>
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
      <li className='myprof'>User Id: {user.id}
      </li>
      <li className='myprof'>Username: {user.username}
      </li>
      <li className='myprof'>Email: {user.email}
      </li>
    </ul>
        <h3>My Tweets</h3>
     
            {tweets.map((tweet) => (
                <div>
                <TweetListItem tweet={tweet} refreshTweet={refreshTweet}  />
            </div>
            ))}
        
        <h3>My Replies</h3>
        
            {replies?.map((reply) => (
                <div>
                    <Reply reply={reply} refreshTweet={refreshTweet} refreshReply={refreshReply}/>
                </div>
            ))}
        
        </div>
    );
    }

export default Profile;