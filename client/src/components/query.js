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
  mutation (
    $email: String!
    $password: String!
  ) {
    login: login(
      email: $email     
      password: $password      
    ) {
      ...userData
    }
  }
  ${USER_DATA}
`;
