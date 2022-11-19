import './home.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAllTweets } from '../../store/tweets';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweets = Object.values(useSelector((state) => state.tweets?.all_tweets ? state.tweets.all_tweets : state.tweets));
    const [tweet, setTweet] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(fetchAllTweets()).catch(async (res) => {
            console.log('res= ', res)
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }, [dispatch]);

    return (
        <div>
        <h3>Home</h3>
        <ul>
            {tweets.map((tweet) => (
                <li>
                    {tweet.body}
                </li>
            ))}
        </ul>

        </div>
    );
    }

export default Home;