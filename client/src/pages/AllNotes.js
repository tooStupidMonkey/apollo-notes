import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DeleteNote from './deleteNote';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  noteList: {
    listStyle: 'unset'
  },
  noteItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  noteLinkItem: {
    textDecoration: 'unset',
    fontSize: '16px',
    cursor: 'pointer'
  }
}));

const NOTES_DATA = gql`
  fragment NoteTile on Note {
    id
    note
  }
`;

export const GET_NOTES = gql`
  query notes($after: String){
    notes(after: $after){
      notes {
        ...NoteTile 
      }
    }
  }
 ${NOTES_DATA},
`;

const AllUsers = () => {
  const classes = useStyles();

  return (
    <Query
      query={GET_NOTES}
      fetchPolicy='network-only'
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
          if (!data.notes.notes.length) {
            return <h2>No data</h2>
          }
        return (
          <ul 
            className={classes.noteList}
            key='allNotes'
          >
            {data.notes.notes.map(({ id, note }, index) => (
              <li 
                key={id}
                className={classes.noteItem}
              >
                <Link 
                  to={`/note/${id}`}
                  className={classes.noteLinkItem}
                >
                  {index + 1}) {note}
                </Link> 
                <span><DeleteNote id={id} /></span>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default AllUsers;
