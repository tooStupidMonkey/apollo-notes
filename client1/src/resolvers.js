import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

export const schema = gql`
  extend type Launch {
    isInCart: Boolean!
  }
`;

export const resolvers = {

};