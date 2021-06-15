import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../helper/functions';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGOUT, GET_ME } from './query';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

export const Header = () => {
  const [isUserLoggedOut, setIsUserLoggedOut] = useState(false)
  let history = useHistory();
  const {
    data: { me: myProfileData = {} } = {},
    loading,
    error,
  } = useQuery(GET_ME, {
    fetchPolicy: 'network-only',
    skip:isUserLoggedOut
  });

  const [logout, { client }] = useMutation(LOGOUT, {
    onError(err) {
      console.log('ERRIR IS  = ', err);
    },
    onCompleted(data) {
      if (data) {
        console.log('Data of Get Me COmpleted = ', data);
      }
    },
  });

  if (error) {
    console.log(error);
    return <div>err</div>;
  }
  console.log('CLIENTNTNT = ', client);

  console.log('data of GetMe = ', myProfileData);

  let body = null;

  if (loading) {
    body = null;
  } else if (!isEmpty(myProfileData)) {
    body = <div>you are logged in as: {myProfileData.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      {isEmpty(myProfileData) ? (
        <>
          <div>
            <Link to="/register">register</Link>
          </div>
          <div>
            <Link to="/login">login</Link>
          </div>
        </>
      ) : null}
      <div>
        <Link to="/bye">bye</Link>
      </div>
      <div>
        {!loading && !isEmpty(myProfileData) ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client.resetStore();
              setIsUserLoggedOut(!isUserLoggedOut)
              history.push('/login');
            }}
          >
            logout
          </button>
        ) : null}
      </div>
      {body}
    </header>
  );
};
