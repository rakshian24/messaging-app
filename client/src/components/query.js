import gql from 'graphql-tag';

const USER_DATA = gql`
  fragment userData on User {
    username
    email
    createdAt
  }
`;

export const SIGNUP = gql`
  mutation (
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp: signUp(
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      ...userData
    }
  }
  ${USER_DATA}
`;

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login: login(email: $email, password: $password) {
      user{
        username
        email
        createdAt
      }
      accessToken
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const GET_ME = gql`
  query {
    me: getMe {
      username
      email
      createdAt
    }
  }
`;

export const BYE = gql`
  query {
    bye: bye {
      bye
    }
  }
`;

export const GET_USERS = gql`
  query ($limit: Int, $offset: Int) {
    users: getUsers(limit: $limit, offset: $offset) {
      has_more
      users_count
      users {
        username
        email
      }
    }
  }
`;
