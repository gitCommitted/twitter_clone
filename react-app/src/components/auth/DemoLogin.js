import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

const DemoLogin = () => {
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
    }
  };

  return (
    <div>
    <Link onClick={onLogin}>
    Demo Login
    </Link> 
    </div>
  );
};

export default DemoLogin;
