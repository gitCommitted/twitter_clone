import './home.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAllTweets } from '../../store/tweets';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TweetListItem from '../tweet/tweetListItem';
import MobileNav from '../NavBar/MobileNav';
import Search from '../../Search';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweets = Object.values(useSelector((state) => state.tweets?.all_tweets ? state.tweets.all_tweets : state.tweets));
    const [tweet, setTweet] = useState('');
    const [errors, setErrors] = useState([]);
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
    // console.log()
    const tweetR = tweets.reverse();
    return (
        <div id='mid'>
        <Search />
        <h3>Home</h3>
        
            {tweets.map((tweet) => (
                <div>
                    <TweetListItem tweet={tweet} refreshTweet={refreshTweet} />
                </div>
            ))}
        

        </div>
    );
    }

export default Home;