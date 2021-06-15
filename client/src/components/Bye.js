import React from 'react';
import { GET_USERS } from './query';
import { useQuery } from '@apollo/react-hooks';

export const Bye = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy:'network-only'
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }
  if (data) {
    console.log('USERS LIST = ', data);
  }

  return <div>{data.bye}</div>;
};
