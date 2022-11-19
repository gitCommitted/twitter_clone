import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../context/modal';
import './tweet.css';
import { fetchTweet } from '../../../store/tweets';

function Tweet({tweet, refreshTweet}) {
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === tweet?.userId;
    // console.log('1tweet= ', tweet?.username);
    // console.log('1tweet= ', tweet?.body);
    return (
      <div className='t-container'>
        <div className='t-detail'>
          <div className='t-title'>Posted By: {tweet?.username}</div>
          <div className='t-body'>{tweet?.body}</div>
            <div className='t-likes'>Likes: {tweet?.Likes.total}</div>
        </div>
        </div>
    );
    }
export default Tweet;