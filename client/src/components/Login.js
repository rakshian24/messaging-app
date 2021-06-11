import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { storeUserDataToLocalStorage } from '../helper/functions';
import { strings } from '../helper/strings';
import { LOGIN } from './query';

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const history = useHistory();

  //Mutation
  const [signUp, { loading }] = useMutation(LOGIN, {
    update(_, res) {
      if (res.data.login) {
        setFormData({});
        history.push('/');
      }
    },
    onError(err) {
      console.log('ERRIR IS  = ', err);
    },
    onCompleted(data) {
      if (data && data.login) {
        storeUserDataToLocalStorage('user', data.login, true);
      }
      console.log('Data = ', data);
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
              signUp({ variables });
            }
            console.log('Form Val = ', formData);
            console.log('isValidated = ', isValidated);
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

export default Login;
