import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Profile from './components/profile';
import { authenticate } from './store/session';
import Home from './components/home';
import TweetDetails from './components/tweet/tweetDetailPage';
import LandingPage from './components/LandingPage';
import LoginFormModal from './components/forms/login';
import About from './components/about';
import MyTweets from './components/profile/mytweets';
import MyReplies from './components/profile/myreplies';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginFormModal />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/about' exact={true}>
          <About />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true} >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/tweets' exact={true} >
          <MyTweets />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/replies' exact={true} >
          <MyReplies />
        </ProtectedRoute>
        <ProtectedRoute path='/tweets/:tweetId' exact={true} >
          <TweetDetails />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <LandingPage />
        </Route>
      </Switch>
      <UsersList/>
    </BrowserRouter>
  );
}

export default App;
