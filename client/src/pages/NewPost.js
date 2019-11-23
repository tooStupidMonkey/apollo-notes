import React from 'react';
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import toastr from 'toastr';

const CREATE_NOTES = gql`
    mutation createNote($note: String!) {
        createNote( note: $note) {
            success
            message
            notes{
              id
              note
            }
        }
    }
`;

const NewPost = (props) => (
  <Mutation
    mutation={CREATE_NOTES}
    onCompleted = {()=>{
      toastr.info('Note has been created');
    }}
  >
    {(createPost, { loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      let userId, title, text

      return (
        <form  onSubmit={e => {
          e.preventDefault();
          createPost({ variables: {
            note: text.value ,
          }});
        }}>
          <textarea
            ref={ node =>  text = node }
          />
          <button type='submit' />
        </form>
      );
    }}
  </Mutation>
);

export default NewPost;
