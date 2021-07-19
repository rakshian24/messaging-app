import React, { useContext } from 'react';
import { GET_USERS } from './query';
import { useQuery } from '@apollo/react-hooks';
import Toast from './Custom/Toast';
import { ToastContext } from '../context/toastContext';
import { ERROR } from '../constant';
import { SHOW_TOASTER } from '../reducer/actionTypes';
import { v4 as uuid } from 'uuid';

export const Bye = () => {
  const { state, toastDispatch } = useContext(ToastContext);
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error && error.graphQLErrors && error.graphQLErrors[0]) {
    console.log(error.graphQLErrors[0].message);
    // toastDispatch({
    //   type: SHOW_TOASTER,
    //   payload: {
    //     id: uuid(),
    //     type: ERROR,
    //     title: 'Error',
    //     message: 'Something Went Wrong!',
    //   },
    // });
    return (
      <>
        <Toast
          position={'toast-top-right'}
        />
        {/* <Toast position={'toast-top-left'} />
    <Toast position={'toast-bottom-left'} />
    <Toast position={'toast-bottom-right'} /> */}
      </>
    );
  }

  if (!data) {
    return <div>No users Found</div>;
  }
  if (data) {
    console.log('USERS LIST = ', data);
  }

  const { users: { users = [] } = {} } = data;

  return (
    <>
      <h1>Users</h1>
      <div>
        {users.map((user) => {
          return <li>{user.username}</li>;
        })}
      </div>
    </>
  );
};
