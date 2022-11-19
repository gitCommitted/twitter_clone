import './profile.css';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchUserTweets } from '../../store/tweets';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweets = Object.values(useSelector((state) => state.tweets?.user_tweets ? state.tweets.user_tweets : state.tweets));
    const [tweet, setTweet] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(fetchUserTweets()).catch(async (res) => {
            console.log('res= ', res)
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }, [dispatch]);

    return (
        <div>
        <h3>My Tweets</h3>
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

export default Profile;