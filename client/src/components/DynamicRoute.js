import React from 'react';
import { Route } from 'react-router-dom';

const DynamicRoute = props => {
  return <Route component={props.component} {...props} />;
};

export default DynamicRoute;
