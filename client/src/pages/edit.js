import React, { Fragment } from 'react';
import gql from 'graphql-tag';

import { Header, Loading } from '../components';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;
const handleNoteFiled = function(event) {
    console.log('event', event)
}

export default function Cart({noteObject}) {
    const {note} = noteObject;
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  return (
    <Fragment>
      <Header>Edit note</Header>
        <textarea onChange={handleNoteFiled}>{note}</textarea>
    </Fragment>
  );
}