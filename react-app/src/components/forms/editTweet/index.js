import './editTweet.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchEditTweets, fetchAllTweets } from '../../../store/tweets';
import {Modal} from '../../context/modal';

function TweetEditForm({ setShowEditModal, tweet, refreshTweet }) {
    const dispatch = useDispatch();

    
    const [body, setBody] = useState(tweet?.body);
    const [errors, setErrors] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
        id: tweet?.id,
        body
      }
  
      const editedTweet = dispatch(fetchEditTweets(payload))
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
          if (!res.errors) {
          setShowEditModal(false);
          }
          return res;
        })
        return editedTweet;
    }
  
    return (
      <form className='modal-container' onSubmit={handleSubmit}>
        <h2 className='modal-form-title'>Edit your Tweet</h2>
  
    
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
  
export default TweetEditForm;