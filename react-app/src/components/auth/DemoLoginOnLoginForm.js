import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

const DemoLoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  if (user) {
    return <Redirect to='/home' />;
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className='demoLogin'>
      <Link onClick={onLogin}>
        <i className="fa-solid fa-id-card"></i>   Login as Demo User
      </Link> 
    </div>
  );
};

export default DemoLoginForm;
