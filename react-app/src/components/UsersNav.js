import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UsersNav = ({current, userId}) => {
    

    return (
        <nav className='profile-nav'>
            {current === 'deets' && (
            <>
                <div className='profile-nav-deets' >
                    <h3 id='current'>Details</h3>
                </div>
                <div className='profile-nav-tweets'>
                    <NavLink to={`/users/${userId}/tweets`}>
                        <h3 id='grey'>Tweets</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-replies'>
                    <NavLink to={`/users/${userId}/replies`}>
                        <h3 id='grey'>Replies</h3>
                    </NavLink>
                </div>
            </>)}
            {current === 'tweets' && (
            <>
                <div className='profile-nav-deets' >
                    <NavLink to={`/users/${userId}`}>
                    <h3 id='grey'>Details</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-tweets'>
                    
                        <h3 id='current'>Tweets</h3>
                    
                </div>
                <div className='profile-nav-replies'>
                    <NavLink to={`/users/${userId}/replies`}>
                        <h3 id='grey'>Replies</h3>
                    </NavLink>
                </div>
            </>)}
            {current === 'replies' && (
            <>
                <div className='profile-nav-replies' >
                    <NavLink to={`/users/${userId}`}>
                    <h3 id='grey'>Details</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-tweets'>
                    <NavLink to={`/users/${userId}/tweets`}>
                        <h3 id='grey'>Tweets</h3>
                    </NavLink>
                </div>
                <div className='profile-nav-replies'>
                   
                        <h3 id='current'>Replies</h3>
                 
                </div>
            </>)}


        </nav>
    );
    }

export default UsersNav;