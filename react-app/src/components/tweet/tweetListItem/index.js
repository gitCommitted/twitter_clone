import React, { useState } from 'react';
import { useHistory,NavLink } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../context/modal';
import './tweetListItem.css';
import { fetchTweet } from '../../../store/tweets';

function TweetListItem({tweet, refreshTweet}) {
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === tweet?.userId;
    // console.log('1tweet= ', tweet?.username);
    // console.log('1tweet= ', tweet?.body);
    return (
      <div className='t-container'>
        <div className='tlist-detail'>
        <NavLink className="qli-link" to={`/tweets/${tweet.id}`}>
        <div className='t-title'>Posted By: {tweet?.username}</div>
        <div className='t-body'>{tweet?.body}</div>
        
        </NavLink>
          
          <div className='t-likes'>Likes: {tweet?.Likes?.total}</div>
        </div>
        </div>
    );
    }
export default TweetListItem;