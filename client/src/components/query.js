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
