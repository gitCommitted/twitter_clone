import './reply.css';
import React, { useState } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Modal } from '../context/modal';


function Reply({reply, refreshReply}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user); 
    const isOwner = sessionUser.id === reply?.userId;
    
    console.log('reply body= ', reply.body);
    // console.log('1tweet= ', tweet?.body);

    



    return (
      <div className='t-container'>
        <div className='t-detail'>
          <div className='t-title'>Posted By: {reply?.username}</div>
          <div className='t-body'>{reply?.body}</div>
       
        
           
        </div>
        </div>
    );
    }
export default Reply;