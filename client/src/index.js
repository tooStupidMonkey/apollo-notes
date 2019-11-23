import { resolvers, typeDefs } from './resolvers';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider, withApollo} from "react-apollo";
import React from 'react';
import Login from './pages/login';
import ReactDOM from 'react-dom';
import Pages from './pages';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import 'toastr/build/toastr.css';
import './styles.scss';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token'),
  },
})

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;


function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

const PageWithApolo = withApollo(IsLoggedIn)

cache.writeData({
    data: {
      isLoggedIn: !!localStorage.getItem('token'),
      notes: [],
    },
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <PageWithApolo />
    </ApolloProvider>,
    document.getElementById('root'),
  );