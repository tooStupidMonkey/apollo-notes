import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import TopPosts from './TopPosts';
import DeleteNote from './deleteNote';

const NOTES_DATA1 = gql`
  fragment NoteTile on Note {
    id
    note
  }
`;

export const GET_NOTES1 = gql`
  query notes($after: String){
    notes(after: $after){
      notes {
        ...NoteTile 
      }
    }
  }
 ${NOTES_DATA1},
`;

const AllUsers = () => (
  <Query
    query={GET_NOTES1}
    fetchPolicy='network-only'
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
        if (!data.notes.notes.length) {
          return <h2>No data</h2>
        }
      return (
        <ul key='allUsers'>
          {data.notes.notes.map(({ id, note }) => (
            <li key={id}><Link  to={`/post/${id}`}>{note}</Link> <span><DeleteNote id={id} /></span></li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default AllUsers;
