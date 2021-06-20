import { useMutation } from '@apollo/react-hooks';
import React, { useState, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/auth';
import { setAccessToken } from '../helper/functions';
import { strings } from '../helper/strings';
import { LOGIN, GET_ME } from './query';

export const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {dispatch} = useContext(AuthContext);

  const history = useHistory();

  //Mutation
  const [login] = useMutation(LOGIN, {
    onError(err) {
      console.log('ERRIR IS  = ', err);
    },
    onCompleted(data) {
      if (data) {
        setAccessToken(data.login.accessToken);
        dispatch({type: "LOGIN", payload: data.login.user});
        history.push('/');
      }
    },
  });

  const onFormInputChange = async e => {
    const trimmedValue = e.target.value.trim();
    setFormData({ ...formData, [e.target.name]: trimmedValue });
  };

  const checkFormData = async () => {
    const { errors: errorString } = strings;
    const { email, username, password, confirmPassword } = formData;

    const validationErrors = {};

    if (!email) {
      validationErrors.email = errorString.email_required;
    }

    if (!password) {
      validationErrors.password = errorString.pwd_required;
    } else if (password.length < 6) {
      validationErrors.password = errorString.pwd_min_length;
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <Row className="py-4 my-5 justify-content-center">
      <Col lg={4} md={6} sm={8} className="signup-card">
        <div className="text-center">
          <h5 className="pb-3">Login</h5>
        </div>
        <Form
          onSubmit={async e => {
            e.preventDefault();

            const isValidated = await checkFormData();
            if (isValidated) {
              const variables = { ...formData };
              login({
                variables,
                update: (store, { data }) => {
                  if (!data) {
                    return null;
                  }
                  //To update the cache like this, the getMe response and Login user response should be exactly same
                  store.writeQuery({
                    query: GET_ME,
                    data: {
                      me: data.login.user,
                    },
                  });
                },
              });
            }
            
          }}
        >
          <Form.Group
            className={errors.email && 'has-error'}
            controlId="formBasicEmail"
          >
            <Form.Label className="formLabel">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              isInvalid={errors.email}
              onChange={e => onFormInputChange(e)}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group
            className={errors.password && 'has-error'}
            controlId="formBasicPwd"
          >
            <Form.Label className="formLabel">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              isInvalid={errors.password}
              onChange={e => onFormInputChange(e)}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              className="pg-btn"
              disabled={!formData.email || !formData.password}
            >
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
