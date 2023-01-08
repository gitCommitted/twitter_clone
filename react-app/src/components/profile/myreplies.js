import './profile.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchUserTweets } from '../../store/tweets';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TweetListItem from '../tweet/tweetListItem';
import { fetchGetUserReplies } from '../../store/reply';
import Reply from '../reply';
import Reply2 from '../reply/index2';
import ProfileNav from './profileNav';

const MyReplies = () => {
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
// console.log()
    return (
        <div id='mid'>
            <h3>My Profile</h3>
            <ProfileNav current='replies'/>
   
        
            {replies?.map((reply) => (
                <div id="prof-list">
                    <Reply2 reply={reply} refreshTweet={refreshTweet} refreshReply={refreshReply}/>
                </div>
            ))}
        
        </div>
    );
    }

export default MyReplies;