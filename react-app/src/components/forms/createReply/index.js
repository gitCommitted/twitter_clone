import './createReply.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateReplies } from '../../../store/reply';
import {Modal} from '../../context/modal';

function ReplyCreateForm({ setShowModal, tweetId, refreshTweet }) {
  const dispatch = useDispatch();
  const history = useHistory()


  const [body, setBody] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      body, 
      tweetId
    }
    
    const createdReply = await dispatch(fetchCreateReplies(payload,tweetId))
    .then(refreshTweet())
    .then(refreshTweet())
    .then((res) => {
        setShowModal(false)
        return res;
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      })

      return createdReply;
  }

  return (
    <form onSubmit={handleSubmit} className='modal-container'>
      <h2 className='modal-form-title'>Reply</h2>
      <textarea
        className='modal-input-body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        name='body'
        placeholder='Write Reply Here'
        required
      />
      {validationErrors && (
        <ul>
          {validationErrors.map((error) => (
            <li className='errors' key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <div>
        <button className='modal-btn modal-submit-btn' type='submit'>
          Submit
        </button>
        <button
          className='modal-btn modal-cancel-btn'
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReplyCreateForm;