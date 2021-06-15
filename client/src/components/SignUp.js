import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { storeUserDataToLocalStorage } from '../helper/functions';
import { strings } from '../helper/strings';
import {SIGNUP} from "./query";

export const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const history = useHistory();

  //Mutation
  const [signUp, {loading}] = useMutation(SIGNUP, {
    update(_, res){
      if(res.data.signUp){
        setFormData({})
        history.push("/")
      }
    },
    onError(err){
      console.log("ERRIR IS  = ", err)
    },
    onCompleted(data){
      if(data && data.signUp){
        storeUserDataToLocalStorage(
          'user',
          data.signUp,
          true,
        );
      }
      console.log("Data = ", data)
    }
  })

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

    if (!username) {
      validationErrors.username = errorString.username_required;
    } else if (username.length < 3) {
      validationErrors.username = errorString.username_min_length;
    } else if (username.length > 20) {
      errors.username = errorString.username_max_length;
    }

    if (!password) {
      validationErrors.password = errorString.pwd_required;
    } else if (password.length < 6) {
      validationErrors.password = errorString.pwd_min_length;
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = errorString.confirm_pwd_required;
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = errorString.pwd_not_matching;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <Row className="py-4 my-5 justify-content-center">
      <Col lg={4} md={6} sm={8} className="signup-card">
        <div className="text-center">
          <h5 className="pb-3">Sign up for your account</h5>
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
            className={errors.username && 'has-error'}
            controlId="formBasicUserName"
          >
            <Form.Label className="formLabel">User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              name="username"
              value={formData.username}
              isInvalid={errors.username}
              onChange={e => onFormInputChange(e)}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid">
                {errors.username}
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
          <Form.Group
            className={errors.confirmPassword && 'has-error'}
            controlId="formBasicConfirmPwd"
          >
            <Form.Label className="formLabel">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              isInvalid={errors.confirmPassword}
              onChange={e => onFormInputChange(e)}
            />
            {errors.confirmPassword && (
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="text-center">
            <Button
              type="submit"
              className="pg-btn"
              disabled={
                !formData.email ||
                !formData.username ||
                !formData.password ||
                !formData.confirmPassword
              }
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
