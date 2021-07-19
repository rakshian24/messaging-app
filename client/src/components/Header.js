import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../helper/functions';
import { useMutation } from '@apollo/react-hooks';
import { LOGOUT } from './query';
import { AuthContext } from '../context/auth';
import { Navbar, NavDropdown, ListGroup, Image, Nav } from 'react-bootstrap';
import logo from '../assets/images/logo.jpg';
import { isEmpty } from 'lodash';
import {LOGOUT as LOGOUT_TYPE} from "../reducer/actionTypes";

export const Header = () => {
  const {
    auth: { user },
    dispatch,
  } = useContext(AuthContext);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [logout, { client }] = useMutation(LOGOUT, {
    onError(err) {
      console.log('ERRIR IS  = ', err);
    },
    onCompleted(data) {
      if (data) {
        dispatch({ type: LOGOUT_TYPE });
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
    <Navbar expand="lg" className="header">
      <div>
        <Navbar.Brand className="title" href="/" to="/" as={Link}>
          <img src={logo} alt="logo" className="ml-3 logo" />
        </Navbar.Brand>
      </div>
      <div>
        <Nav className="header-nav ml-auto">
          {isEmpty(user) ? (
            <>
              <Nav.Item href="/login">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item href="/signup">
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </>
          ) : null}
          {!isEmpty(user) ? (
            <Nav.Item>
              <NavDropdown
                id="basic-nav-dropdown"
                className="nav-dropdown"
                alignRight
                title={
                  <div className="profile-image">
                    <Image
                      src={'https://place-hold.it/300'}
                      alt="user-profile-pic"
                    />
                  </div>
                }
                onClick={e => {
                  e.stopPropagation();
                  isProfileOpen
                    ? closeProfileDropdown()
                    : openProfileDropdown();
                }}
                onMouseOver={openProfileDropdown}
                onMouseOut={closeProfileDropdown}
                show={isProfileOpen}
              >
                <div className="profile-nav-dropdown">
                  <div className="dropdown-user-profile">
                    <div className="user-profile-image mx-3">
                      <Image
                        src={'https://place-hold.it/300'}
                        alt="user-profile-pic"
                      />
                    </div>
                    <div className="user-profile-name">
                      <div>{user.username}</div>
                      <div>{user.email}</div>
                    </div>
                  </div>
                  <hr />
                  <ListGroup className="header-dropdown-list">
                    <ListGroup.Item
                      as={'a'}
                      href="/login"
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
              </NavDropdown>
            </Nav.Item>
          ) : null}
        </Nav>
      </div>
    </Navbar>
  );
};
