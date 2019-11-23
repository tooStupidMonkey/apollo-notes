import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { GET_NOTES1 } from './AllUsers';
import toastr from 'toastr';

const REMOVE_NOTES = gql`
mutation deleteNote($noteId: ID!) {
  deleteNote( noteId: $noteId) {
    success
    message
    notes{
      id
      note
    }
  }
}
`;

const DeleteNote = ({id}) => {
    return (
      <Mutation 
        mutation={REMOVE_NOTES}
        refetchQueries={[{ query: GET_NOTES1 }]}
        onCompleted = {()=>{
          toastr.info('Note has been deleted');
        }}
    >
        {(deleteNote, { data }) => (
          <div>
              <span onClick={e => {
                e.preventDefault();
                deleteNote({
                    variables : {noteId: id}
                  });
              }}>
              delete
              </span>
          </div>
        )}
      </Mutation>
    );
  };
  export default DeleteNote;