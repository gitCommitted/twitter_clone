import React, { useState } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../context/modal';
import './tweet.css';

import {fetchCreateLike, fetchDeleteLike} from '../../../store/tweets';
import TweetEditForm from '../../forms/editTweet';
import TweetDelete from '../../forms/deleteTweet';

function Tweet({tweet, refreshTweet}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === tweet?.userId;
    const youLiked = tweet?.Likes?.youLiked;
    // console.log('1tweet= ', tweet?.username);
    // console.log('1tweet= ', tweet?.body);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleLike = async (e) => {
        e.preventDefault();
        return youLiked ? await dispatch(fetchDeleteLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet()) : await dispatch(fetchCreateLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet());
    }



    return (
      <div className='t-container'>
        <div className='t-detail'>
          <div className='t-user'>Posted By: {tweet?.username}</div>
          <div className='t-body-detail'>{tweet?.body}</div>
          
          <div className="qli-link" onClick={handleLike}>
            <Link className='t-likes'>Likes: {tweet?.Likes.total} youLiked: {tweet?.Likes?.youLiked ? `Yes`: `No`}</Link>
            </div>
            <div className='q-actions-container'>
          {isOwner && <button className="edButton" onClick={() => setShowEditModal(true)}>Edit </button>}
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <TweetEditForm setShowEditModal={setShowEditModal} tweet={tweet} refreshTweet={refreshTweet}/>
            </Modal>
          )}
          {isOwner && <button  className="edButton" onClick={() => setShowDeleteModal(true)}>Delete</button> }
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <TweetDelete setShowDeleteModal={setShowDeleteModal} tweetId={tweet?.id} refreshTweet={refreshTweet}/>
            </Modal>
          )}
          </div>
        </div>
        </div>
    );
    }
export default Tweet;