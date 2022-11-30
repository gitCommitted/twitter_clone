import React, { useState } from 'react';
import { useHistory,NavLink, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../../context/modal';
import './tweetListItem.css';
import { fetchTweet,fetchCreateLike,fetchDeleteLike } from '../../../store/tweets';
import TweetEditForm from '../../forms/editTweet';
import TweetDelete from '../../forms/deleteTweet';
import LoginFormModal from '../../forms/login';
import LoginForm from '../../auth/LoginForm';

function TweetListItem({tweet, refreshTweet, refreshReply}) {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session?.user); 
    const isOwner = sessionUser?.id === tweet?.userId;
    const youLiked = tweet?.Likes?.youLiked;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
  


    const handleLike = async (e) => {
        e.preventDefault();
        return youLiked ? await dispatch(fetchDeleteLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet()) : await dispatch(fetchCreateLike(tweet.id)).then(refreshTweet())
        .then(refreshTweet());
    }

    return (
      <div className='t-container'>
        <div className='tlist-detail'>
          {sessionUser && (
        <div className='t-user-box'>
        <NavLink className="t-user" to={`/tweets/${tweet?.id}`}>Posted By: {tweet?.username}</NavLink>
        </div>)}
        {!sessionUser && (
        <div className='t-user-box'>
        <Link className="t-user" onClick={() => setShowModal(true)}>Posted By: {tweet?.username}</Link>
        </div>)}
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
              <LoginForm setShowModal={setShowModal} tweetId={tweet?.id} refreshTweet={refreshTweet}/>
        </Modal>)}
        {!sessionUser && (
        <div>
        <Link className="t-body" onClick={() => setShowModal(true)}>{tweet?.body}</Link>
        </div>)}
       

        {sessionUser && (
        <div>
        <NavLink className="t-body" to={`/tweets/${tweet?.id}`}>{tweet?.body}</NavLink>
        </div>)}
        
        {sessionUser && (
        <div className="qli-link" onClick={handleLike}>
            <Link className='t-likes'>Likes: {tweet?.Likes?.total} You liked this?: {tweet?.Likes?.youLiked ? `Yes`: `No`}</Link>
            </div>)}
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
              <TweetDelete setShowDeleteModal={setShowDeleteModal} tweetId={tweet?.id} refreshTweet={refreshTweet} />
            </Modal>
          )}
          { refreshReply && (
            showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <TweetDelete setShowDeleteModal={setShowDeleteModal} tweetId={tweet?.id} refreshTweet={refreshTweet} refreshReply={refreshReply} />
            </Modal>
          ))}
          </div>
        
        </div>
        </div>
    );
    }
export default TweetListItem;