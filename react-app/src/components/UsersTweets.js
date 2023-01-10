import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TweetListItem from './tweet/tweetListItem';
import UsersNav from './UsersNav';
import { useSelector } from 'react-redux';

function UserTweets() {
    const tweets = Object.values(useSelector((state) => state.tweets?.all_tweets ? state.tweets.all_tweets : state.tweets));
    const { userId }  = useParams();
    const [user, setUser] = useState({});


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


    const tlist = (tweet) => {
        return (
            <div id="prof-list">
                <TweetListItem tweet={tweet}   />
            </div>
        )}
    const tweetsRes = tweets.filter((tweet) => tweet.userId == userId);

  return (
  
    <div id='mid'>
      <h3>{user?.username}'s Profile</h3>
    <UsersNav current='tweets' userId={userId}/>
    {tweetsRes.length > 0 ?
    
    tweets.map((tweet) => {
                if (tweet.userId == userId) {
            return tlist(tweet)    
                }
            }) :
            <div className='userD'>
                <h3>No Tweets Yet</h3>
            </div>
    }
    
    </div>   
    
    


    );
}
export default UserTweets;