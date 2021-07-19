import React, { useState, useEffect, useContext } from 'react';
import { Routes } from './components/Routes';
import { AuthContext } from './context/auth';
import { setAccessToken } from './helper/functions';
import Loader from './components/Custom/Loader';
import { LOGIN } from './reducer/actionTypes';

export const App = () => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:4004/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async x => {
      const { accessToken, user } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
      dispatch({ type: LOGIN, payload: user });
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Routes />;
};
