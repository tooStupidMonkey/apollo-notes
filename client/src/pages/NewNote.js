import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import toastr from 'toastr';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( () => ({
  newNoteForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px'
  },
  noteTextField: {
    marginBottom: '15px'
  }
}));

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

const NewNote = () => {
  const classes = useStyles();
  const [note, setNote] = useState('');

  return (
    <Mutation
      mutation={CREATE_NOTES}
      onCompleted = {()=>{
        toastr.info('Note has been created');
      }}
    >
      {(createNote, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return (
          <form  
            onSubmit={e => {
              e.preventDefault();
              createNote({ variables: {
                note
              }});
            }}
            className={classes.newNoteForm}
          >
            <Input
              autoFocus={true}
              className={classes.noteTextField}
              onChange={(event) => setNote(event.target.value)}
            />
            <Button 
              variant="contained" 
              color="primary" 
              type='submit'
            > 
              Create note 
            </Button>
          </form>
        );
      }}
    </Mutation>
  );
} 

export default NewNote;
