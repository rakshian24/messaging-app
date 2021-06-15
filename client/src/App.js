import React, { useState, useEffect } from 'react';
import { Routes } from './components/Routes';
import { setAccessToken } from './helper/functions';

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4004/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
};
