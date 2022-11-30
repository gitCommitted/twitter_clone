import './reply.css';
import React, { useState } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../context/modal';
import ReplyEditForm from '../forms/editReply';
import ReplyDelete from '../forms/deleteReply';


function Reply({reply, refreshReply, refreshTweet}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === reply?.userId;
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // console.log('reply body= ', reply.body);
    // console.log('1tweet= ', tweet?.body);

    



    return (
      <div className='t-container'>
        <div className='t-detail'>
          <div className='t-user'>Posted By: {reply?.username}</div>
          <div className='r-body'>{reply?.body}</div>
          <div className='q-actions-container'>
          {isOwner && <button className="edButton" onClick={() => setShowEditModal(true)}>Edit </button>}
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <ReplyEditForm setShowEditModal={setShowEditModal} reply={reply} refreshTweet={refreshTweet} refreshReply={refreshReply}/>
            </Modal>
          )}
          {isOwner && <button  className="edButton" onClick={() => setShowDeleteModal(true)}>Delete</button> }
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <ReplyDelete setShowDeleteModal={setShowDeleteModal} replyId={reply?.id} refreshTweet={refreshTweet} refreshReply={refreshReply}/>
            </Modal>
          )}
          </div>
        
           
        </div>
        </div>
    );
    }
export default Reply;