import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TweetListItem from './tweet/tweetListItem';
import UsersNav from './UsersNav';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTweets } from '../store/tweets';



function UserTweets() {
    const tweets = Object.values(useSelector((state) => state.tweets?.all_tweets ? state.tweets.all_tweets : state.tweets));
    const { userId }  = useParams();
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const refreshTweet = () => {
        dispatch(fetchAllTweets());
        }
    useEffect(() => {
        refreshTweet();
        // dispatch(fetchAllTweets()).catch(async (res) => {
        //     console.log('res= ', res)
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    }, [dispatch]);

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
                <TweetListItem tweet={tweet}  refreshTweet={refreshTweet} />
            </div>
        )}
    const tweetsRes = tweets.filter((tweet) => tweet.userId == userId);

  return (
  
    <>
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
    
    </>   
    
    


    );
}
export default UserTweets;