import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducer/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [auth, dispatch] = useReducer(authReducer, {
    isUserLoggedIn: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
