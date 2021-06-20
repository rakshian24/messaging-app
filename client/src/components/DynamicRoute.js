import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const DynamicRoute = props => {
  const { component, auth, noAuth } = props;
  const {
    auth: { user },
  } = useContext(AuthContext);
  if (auth && !user) {
    return <Redirect to="/login" />;
  } else if (noAuth && user) {
    return <Redirect to="/" />;
  } else {
    return <Route component={component} {...props} />;
  }
};

export default DynamicRoute;
