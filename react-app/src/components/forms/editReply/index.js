import './editReply.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchEditReplies } from '../../../store/reply';
import {Modal} from '../../context/modal';

function ReplyEditForm({ setShowEditModal, reply, refreshTweet, refreshReply }) {
    const dispatch = useDispatch();

    
    const [body, setBody] = useState(reply?.body);
    const [errors, setErrors] = useState([]);
    // console.log('reply', reply)
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        id: reply?.id,
        body
      }
    //   console.log('payload', payload, 'reply', reply, reply.id)
      const editedReply = dispatch(fetchEditReplies(payload,reply.id))
      .then((res) => {
        // console.log('res', res.errors)
        if (res && res.errors) {
          setErrors(res.errors)
        };
        return res
        })
        .then((res) => {
          if (!res.errors) {
          refreshTweet();
          }
          return res;
        })
        .then((res) => {
          if (!res.errors) {
          refreshTweet();
          }
          return res;
        })
        
        .then((res) => {
          if (!res.errors && refreshReply) {
            refreshReply();
          }
          return res;
        })
        .then((res) => {
          if (!res.errors && refreshReply) {
            refreshReply();
          }
          return res;
        })
        .then((res) => {
          if (!res.errors) {
          setShowEditModal(false);
          }
          return res;
        })
        return editedReply;
    }
  
    return (
      <form className='modal-container' onSubmit={handleSubmit}>
        <h2 className='modal-form-title'>Edit your Reply</h2>
  
    
        <textarea
          className='modal-input-body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name='body'
          required
        />
        <ul>
          {errors.length > 0 &&
            errors.map((error) => (
              <li className='errors' key={error}>
                {error}
              </li>
            ))}
        </ul>
        <div>
          <button className='modal-btn modal-submit-btn'>Submit</button>
          <button onClick={() => setShowEditModal(false)} className='modal-btn modal-cancel-btn'>Cancel</button>
        </div>
      </form>
    );
  }
  
export default ReplyEditForm;