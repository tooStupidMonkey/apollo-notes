import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { GET_NOTES1 } from './AllUsers';

const EDIT_NOTE = gql`
  mutation editNote ($id: ID!, $note: String){
    editNote( id: $id, note: $note) {
      success
      message
    }
  }
`;

const EditNote = ({ noteObject}) => {
    const {id, note} = noteObject;
    let input;
    //const [noteText, setNoteText] = useState(note);
    return (
      <Mutation 
        mutation={EDIT_NOTE}
        refetchQueries={[{ query: GET_NOTES1 }]}
    >
        {(editNote, { data }) => (
          <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    editNote({ variables: { id, note: input.value } });

                  }}
                >
                  <input
                    ref={node => {
                      input = node;
                    }}
                    defaultValue={note}
                  />
                  <button type="submit">Update Todo</button>
                </form>
          </div>
        )}
      </Mutation>
    );
  };
  export default EditNote;