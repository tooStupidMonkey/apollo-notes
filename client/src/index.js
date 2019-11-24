import { resolvers, typeDefs } from './resolvers';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import React from 'react';
import Login from './pages/login';
import ReactDOM from 'react-dom';
import Pages from './pages';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import 'toastr/build/toastr.css';
import './styles.css';

const cache = new InMemoryCache();
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token'),
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    notes: [],
  },
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root'),
);
