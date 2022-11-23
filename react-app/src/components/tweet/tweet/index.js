import React, { useState } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../context/modal';
import './tweet.css';
import { fetchTweet } from '../../../store/tweets';
import {fetchCreateLike, fetchDeleteLike} from '../../../store/tweets';

function Tweet({tweet, refreshTweet}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === tweet?.userId;
    const youLiked = tweet?.Likes?.youLiked;
    // console.log('1tweet= ', tweet?.username);
    // console.log('1tweet= ', tweet?.body);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleLike = async (e) => {
        e.preventDefault();
        return youLiked ? await dispatch(fetchDeleteLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet()) : await dispatch(fetchCreateLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet());
    }



    return (
      <div className='t-container'>
        <div className='t-detail'>
          <div className='t-title'>Posted By: {tweet?.username}</div>
          <div className='t-body'>{tweet?.body}</div>
          <Link className="qli-link" onClick={handleLike}>
            <div className='t-likes'>Likes: {tweet?.Likes.total} youLiked: {tweet?.Likes?.youLiked ? `Yes`: `No`}</div>
            </Link>
        </div>
        </div>
    );
    }
export default Tweet;