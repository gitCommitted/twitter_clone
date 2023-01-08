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

const ProfileNav = ({current}) => {
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
        <nav className='profile-nav'>
            {current === 'deets' && (
            <>
                <div className='profile-nav-deets' >
                    <h3 id='current'>Details</h3>
                </div>
                <div className='profile-nav-tweets'>
                    <NavLink to='/profile/tweets'>
                        <h3 id='grey'>Tweets</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-replies'>
                    <NavLink to='/profile/replies'>
                        <h3 id='grey'>Replies</h3>
                    </NavLink>
                </div>
            </>)}
            {current === 'tweets' && (
            <>
                <div className='profile-nav-deets' >
                    <NavLink to='/profile'>
                    <h3 id='grey'>Details</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-tweets'>
                    
                        <h3 id='current'>Tweets</h3>
                    
                </div>
                <div className='profile-nav-replies'>
                    <NavLink to='/profile/replies'>
                        <h3 id='grey'>Replies</h3>
                    </NavLink>
                </div>
            </>)}
            {current === 'replies' && (
            <>
                <div className='profile-nav-replies' >
                    <NavLink to='/profile'>
                    <h3 id='grey'>Details</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-tweets'>
                    <NavLink to='/profile/tweets'>
                        <h3 id='grey'>Tweets</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-replies'>
                   
                        <h3 id='current'>Replies</h3>
                 
                </div>
            </>)}


        </nav>
    );
    }

export default ProfileNav;