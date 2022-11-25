import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchDeleteTweets} from '../../../store/tweets';

function TweetDelete({ setShowDeleteModal, tweetId, refreshTweet }) {
    const dispatch = useDispatch();
    const history = useHistory()

    const [errors, setErrors] = useState([]);

    const onDelete = () => {
        dispatch(fetchDeleteTweets(tweetId))
        .then(() => setShowDeleteModal(false))
        .then(() => refreshTweet())
        .then(() => history.push('/profile'))
            .catch(async (res) => {
                const data = await res.json()
                if(data && data.errors) setErrors(data.errors)
            })
    };

    return (
        <div className='modal-container'>
            <ul>
                {errors && errors.map(error => 
                    <li className='errors' key={error}>{error}</li>
                )}
            </ul>
            <p className='modal-form-title'>Are you sure you want to delete this tweet?</p>
            <div>
                <button className='modal-btn modal-submit-btn' onClick={() => onDelete()}>Delete</button>
                <button className='modal-btn modal-cancel-btn' onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
        </div>
    );
}

export default TweetDelete;