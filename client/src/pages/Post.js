import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import DeleteNote from './deleteNote';
import EditNote from './EditNote';

const Post = (props) => (
  <Query
    query={gql`
      query {
        note(id: "${props.match.params.postId}") {
          id
          note
        }
      }
   `}
    fetchPolicy='network-only'
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
        console.log(loading, error, data)
      return (
        <ul key='topPosts'>
          <li>{data.note.id}</li>
          <li><EditNote noteObject={data.note} /></li>
          <li><DeleteNote id={data.note.id} /></li>
        </ul>
      );
    }}
  </Query>
);

export default Post;
