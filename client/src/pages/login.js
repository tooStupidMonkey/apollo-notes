import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import toastr from 'toastr';
import { LoginForm, Loading } from '../components';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login() {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        if ( login) {
          localStorage.setItem('token', login);
          client.writeData({ data: { isLoggedIn: true } });
        } else {
          toastr.error('Password was not created!');
        }
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}