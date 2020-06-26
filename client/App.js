import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import {AsyncStorage, View} from 'react-native';
import {setContext} from "apollo-link-context";
import {AUTH_TOKEN, URL} from '@/utils/constans'
import {AplicationStack} from '@/utils/screens'
import ErrorNotification from '@/components/ErrorNotification'
import { createUploadLink } from 'apollo-upload-client';


let token;

const cache = new InMemoryCache();
const httpLink = createUploadLink({ uri: URL });

const authLink = setContext(async (_, { headers }) => {
  token = await AsyncStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token || null
    }
  };
});
cache.writeData({
  data: {
    isLoggedIn: false,
    notes: [],
    notifications: []
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ErrorNotification /> 
      <AplicationStack />
    </ApolloProvider>
  );
}


