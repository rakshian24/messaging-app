import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Bye } from './Bye';
import DynamicRoute from './DynamicRoute';
import PageNotFound from './PageNotFound';
import { Header } from './Header';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-body">
        <Switch>
          <DynamicRoute exact path="/" component={Home} auth />
          <DynamicRoute exact path="/signup" component={SignUp} noAuth />
          <DynamicRoute exact path="/login" component={Login} noAuth />
          <DynamicRoute exact path="/bye" component={Bye} auth />
          <DynamicRoute path="*" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
