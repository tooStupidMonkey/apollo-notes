import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { GET_NOTES } from './AllNotes';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import toastr from 'toastr';

const useStyles = makeStyles( () => ({
  noteTextField: {
    marginRight: '30px'
  }
}));

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
    const [newNote, setNewNote] = useState('');
    const classes = useStyles();

    return (
      <Mutation 
        mutation={EDIT_NOTE}
        refetchQueries={[{ query: GET_NOTES }]}
        onCompleted = {()=>toastr.info('Note has been updated')}
        onError={()=>toastr.error('Server error')}
    >
        {(editNote, { data }) => (
          <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    editNote({ variables: { id, note: newNote } });

                  }}
                >
                  <Input
                    onChange={(event) => setNewNote(event.target.value)}
                    defaultValue={note}
                    className={classes.noteTextField}
                  />
                  <Button               
                    variant="contained" 
                    color="primary" 
                    type='submit'
                  >
                      Update Todo
                  </Button>
                </form>
          </div>
        )}
      </Mutation>
    );
  };
  export default EditNote;