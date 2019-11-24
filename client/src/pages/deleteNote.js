import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { GET_NOTES } from './AllNotes';
import toastr from 'toastr';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  deleteIcon: {
    cursor: 'pointer'
  },
}));


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

const DeleteNote = ({id, redirect=false, history}) => {
  const classes = useStyles();

    return (
      <Mutation 
        mutation={REMOVE_NOTES}
        refetchQueries={[{ query: GET_NOTES }]}
        onCompleted = {()=>{
          toastr.info('Note has been deleted');
          if (redirect) {
            history.push('/');
          }
        }}
    >
        {(deleteNote, { data }) => (
          <div>
              <DeleteOutlinedIcon
              className={classes.deleteIcon}
              onClick={e => {
                e.preventDefault();
                deleteNote({
                    variables : {noteId: id}
                  });
              }}
              />
          </div>
        )}
      </Mutation>
    );
  };
  export default withRouter(DeleteNote);