
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAllTweets2 } from '../../store/tweets';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TweetListItem from '../tweet/tweetListItem';
import { Modal } from '../context/modal';
import LoginForm from '../auth/LoginForm';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweets = Object.values(useSelector((state) => state.tweets?.all_tweets ? state.tweets.all_tweets : state.tweets));
    const [tweet, setTweet] = useState('');
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const refreshTweet = () => {
        dispatch(fetchAllTweets2());
        }
    useEffect(() => {
        refreshTweet();
        // dispatch(fetchAllTweets()).catch(async (res) => {
        //     console.log('res= ', res)
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    }, [dispatch]);
    console.log()
    const tweetR = tweets.reverse();
    return (
        <div id='mid'>
            <h3>
            <Link onClick={() => setShowModal(true)}>
            Explore i-tweet
            </Link>
            </h3>
        
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
              <LoginForm setShowModal={setShowModal} tweetId={tweet?.id} refreshTweet={refreshTweet}/>
        </Modal>)}
            {tweets.map((tweet) => (
                <div>
                    <TweetListItem tweet={tweet} refreshTweet={refreshTweet} />
                </div>
            ))}
        

        </div>
    );
    }

export default LandingPage;