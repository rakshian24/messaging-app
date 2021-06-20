import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../helper/functions';
import { useMutation } from '@apollo/react-hooks';
import { LOGOUT } from './query';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Navbar, NavDropdown, ListGroup, Image, Nav } from 'react-bootstrap';
import logo from '../assets/images/logo.jpg';

export const Header = () => {
  const {
    auth: { user },
    dispatch,
  } = useContext(AuthContext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  let history = useHistory();

  const [logout, { client }] = useMutation(LOGOUT, {
    onError(err) {
      console.log('ERRIR IS  = ', err);
    },
    onCompleted(data) {
      if (data) {
        history.push('/login');
        dispatch({ type: 'LOGOUT' });
      }
    },
  });

  const openProfileDropdown = () => {
    setIsProfileOpen(true);
  };

  const closeProfileDropdown = () => {
    setIsProfileOpen(false);
  };

  return (
    <Navbar expand="lg" className="header" href="/" to="/" as={Link}>
      <Navbar.Brand className="title">
        <img src={logo} alt="logo" className="ml-2 logo" />
      </Navbar.Brand>
      <Nav.Item>
        <NavDropdown
          className="no-sm-caret profile-nav-dropdown-wrapper"
          alignRight
          title={
            <div className="profile-image">
              <Image src={logo} />
            </div>
          }
          onClick={e => {
            e.stopPropagation();
            isProfileOpen ? closeProfileDropdown() : openProfileDropdown();
          }}
          onMouseOver={openProfileDropdown}
          onMouseOut={closeProfileDropdown}
          show={isProfileOpen}
        >
          <div>
            <div className="profile-nav-dropdown mb-2 ">
              <ListGroup className="header-dropdown-list">
                <ListGroup.Item
                  onClick={async () => {
                    await logout();
                    setAccessToken('');
                    await client.resetStore();
                  }}
                >
                  Sign Out
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </NavDropdown>
      </Nav.Item>
    </Navbar>
  );
};
