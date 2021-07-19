import React, { createContext, useReducer } from 'react';
import { toastReducer } from '../reducer/toastReducer';
import { INITIAL_APP_STATE } from './intialAppState';

export const ToastContext = createContext();

export const ToastContextProvider = (props) => {
  const [state, toastDispatch] = useReducer(toastReducer, INITIAL_APP_STATE);

  return (
    <ToastContext.Provider value={{ state, toastDispatch }}>
      {props.children}
    </ToastContext.Provider>
  );
};
