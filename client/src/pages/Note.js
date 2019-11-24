import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DeleteNote from './deleteNote';
import EditNote from './EditNote';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  noteItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
}));

const Note = (props) => {
  const classes = useStyles();

  return (
    <Query
      query={gql`
        query {
          note(id: "${props.match.params.noteId}") {
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
        return (
          <div 
            key="Note"
            className={classes.noteItem}
          >
            <div><EditNote noteObject={data.note} /></div>
            <div><DeleteNote id={data.note.id} redirect={true} /></div>
          </div>
        );
      }}
    </Query>
  );
} 

export default Note;
