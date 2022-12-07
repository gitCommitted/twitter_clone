import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pic, setPic] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (password === repeatPassword) {
      
      formData.append('username', username)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('pic', pic)
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    } else {

      setErrors(["Passwords must match."]);

    }
    
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updatePic = (e) => {
    setPic(e.target.files[0]);
  };


  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form className='modal-container' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div className='errors' key={ind}>
            {error}
          </div>
        ))}
      </div>
      <div>
        <label className='modal-input-title-label'>User Name</label>
        <input
          className='modal-input-title'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label className='modal-input-title-label'>Email</label>
        <input
          className='modal-input-title'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='image-title'>Add Profile Pic (optional)</div>
      <input
          className='modal-input-title file-btn'
          id='imageButton'
          type='file'
          accept='pic/*'
          onChange={updatePic}
        />
      <div>
        <label className='modal-input-title-label'>Password</label>
        <input
          className='modal-input-title'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label className='modal-input-title-label'>Repeat Password</label>
        <input
          className='modal-input-title'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='modal-btn modal-submit-btn' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

