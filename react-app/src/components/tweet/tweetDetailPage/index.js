import './tweetDetailPage.css';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Tweet from '../tweet';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchTweet } from '../../../store/tweets';
import Reply from '../../reply';
import { Modal } from '../../context/modal';
import ReplyCreateForm from '../../forms/createReply';


const TweetDetails = () => {
    const { tweetId } = useParams();
    const parsedId = parseInt(tweetId, 10);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const tweet = useSelector(state => state.tweets);
    const replies  = tweet?.one_tweet?.Replies;
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
      <div className='replyButton'>
        <button onClick={() => setShowModal(true)}>Reply</button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <ReplyCreateForm setShowModal={setShowModal} tweetId={tweet.one_tweet.id} refreshTweet={refreshTweet } />
              </Modal>
            )}
            </div>
      <h3>Replies</h3>
        <ul>
            {replies?.map((reply) => (
                <li>
                    <Reply reply={reply} />
                </li>
            ))}
        </ul>
    </div>
  );
}


export default TweetDetails;