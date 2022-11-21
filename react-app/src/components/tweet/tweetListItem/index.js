import React, { useState } from 'react';
import { useHistory,NavLink, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../context/modal';
import './tweetListItem.css';
import { fetchTweet,fetchCreateLike,fetchDeleteLike } from '../../../store/tweets';

function TweetListItem({tweet, refreshTweet}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === tweet?.userId;
    const youLiked = tweet?.Likes?.youLiked;


    const handleLike = async (e) => {
        e.preventDefault();
        return youLiked ? await dispatch(fetchDeleteLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet()) : await dispatch(fetchCreateLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet());
    }

    return (
      <div className='t-container'>
        <div className='tlist-detail'>
        <NavLink className="qli-link" to={`/tweets/${tweet.id}`}>
        <div className='t-title'>Posted By: {tweet?.username}</div>
        <div className='t-body'>{tweet?.body}</div>
        
        </NavLink>
        <Link className="qli-link" onClick={handleLike}>
            <div className='t-likes'>Likes: {tweet?.Likes?.total} youLiked: {tweet?.Likes?.youLiked ? `Yes`: `No`}</div>
            </Link>
        </div>
        </div>
    );
    }
export default TweetListItem;