import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducer/authReducer';
import { INITIAL_APP_STATE } from './intialAppState';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [auth, dispatch] = useReducer(authReducer, INITIAL_APP_STATE);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
