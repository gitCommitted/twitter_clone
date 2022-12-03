import './createTweet.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateTweets, fetchAllTweets, fetchTweet } from '../../../store/tweets';
import {Modal} from '../../context/modal';

function TweetCreateForm({ setShowModal, refreshTweet }) {
  const dispatch = useDispatch();
  const history = useHistory()


  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('body', body)
    formData.append('image', image)
    
    const createdTweet = await dispatch(fetchCreateTweets(formData))
    .then((res) => {
      // console.log('res', res.errors)
      if (res && res.errors) {
        setValidationErrors(res.errors)
      } else {
        setShowModal(false)
      }
      return res
      })
      .then((res) => {
        if (!res.errors) {
        dispatch(fetchTweet(res.id));
        }
        return res;
       })
      .then((res) => {
        if (!res.errors) {
       history.push(`/tweets/${res?.id}`);
        }
      })
      // .catch(async (res) => {
      //   const data = await res.json();
      //   ;
      // })

      return createdTweet;
  }

  return (
    <form onSubmit={handleSubmit} className='modal-container'>
      <h2 className='modal-form-title'>Tweet</h2>
      <textarea
        className='modal-input-body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        name='body'
        placeholder='Write Tweet Here'
        required
      />
      <input
          className='modal-input-title file-btn'
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
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

export default TweetCreateForm;