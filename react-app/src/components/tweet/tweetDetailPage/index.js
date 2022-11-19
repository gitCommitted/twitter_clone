import './tweetDetailPage.css';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Tweet from '../tweet';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTweet } from '../../../store/tweets';

const TweetDetails = () => {
    const { tweetId } = useParams();
    const parsedId = parseInt(tweetId, 10);
    const dispatch = useDispatch();

    const tweet = useSelector(state => state.tweets);
    const replies  = tweet.one_tweet?.Replies;
    const [errors, setErrors] = useState([]);

    console.log('tweet= ', tweet);
    console.log('replies= ', replies);
    const refreshTweet = () => {
    dispatch(fetchTweet(parsedId));
    }

    useEffect(() => {
    refreshTweet();
    }, [dispatch])

  return (
    <div className='tdp-container'>
      <h3>Tweet Details:</h3>
      <Tweet tweet={tweet.one_tweet} refreshTweet={refreshTweet}/>
    </div>
  );
}


export default TweetDetails;