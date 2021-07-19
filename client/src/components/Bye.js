import React from 'react';
import { GET_USERS } from './query';
import { useQuery } from '@apollo/react-hooks';

export const Bye = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error && error.graphQLErrors && error.graphQLErrors[0]) {
    console.log(error.graphQLErrors[0].message);
    return <div>Error</div>;
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
