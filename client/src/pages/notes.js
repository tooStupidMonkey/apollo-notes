import React, { Fragment } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import { Loading } from '../components';
import Note from '../components/note';
import  CreateNoteForm  from '../components/CreateNoteForm';

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

const NOTES_DATA1 = gql`
  fragment NoteTile on Note {
    id
    note
  }
`;

const GET_NOTES1 = gql`
  query notes($after: String){
    notes(after: $after){
      notes {
        ...NoteTile 
      }
    }
  }
 ${NOTES_DATA1}
`;


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

const NOTES_DATA = gql`
  fragment NoteTile on Note {
    id
    note
  }
`;

const GET_NOTES_CACHE = gql`
  query notes($after: String){
    notes @client (after: $after) {
      id
      note
    }
  }
`;

const EDIT_NOTE = gql`
  mutation editNote ($id: ID!, $note: String){
    editNote( id: $id, note: $note) {
      success
      message
    }
  }
`;


export default function Notes() {
  const client = useApolloClient();
  const data =  client.readQuery({query: GET_NOTES_CACHE});
  console.log('here', data)
  //const { data, loading, error, fetchMore } = useQuery(GET_NOTES_CACHE);

  const [deleteNote, { }] = useMutation(
    REMOVE_NOTES,
    {
        onCompleted({ deleteNote }) {
            client.writeData({ 
              data: { 
                notes: deleteNote.notes
              } 
            });
        }
    }
  );

  const [editNote, { }] = useMutation(
    EDIT_NOTE,
    {
        onCompleted({ editNote }) {
            console.log('editNote', editNote)
        }
    }
  );

  const [createNote, { loadingCreate, errorCreate }] = useMutation(
    CREATE_NOTES,
    {
        onCompleted({ createNote }) {
          const { data } = useQuery(GET_NOTES1);
          console.log('data', data)
          client.writeData({ 
            data: { 
              notes: data.notes.concat(createNote.notes)
            } 
          });
        },
        refetchQueries() {

        }
    }
  );

  //if (loading) return <Loading />;
  //if (error) return <p>ERROR</p>;

  return (
    <Fragment>
      <div>
        <h2>Note list:</h2>
      </div> 
      <div>
      {data.notes && data.notes &&
        data.notes.length &&
        data.notes.map(note => (
          <Note
            key={note.id}
            noteObject={note}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ))}
        {/* {data.notes &&
        data.notes.hasMore && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.notes.cursor,
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    launches: {
                      ...fetchMoreResult.launches,
                      launches: [
                        ...prev.launches.launches,
                        ...fetchMoreResult.launches.launches,
                      ],
                    },
                  };
                },
              })
            }
          >
            Load More
          </Button>
        )
      } */}
      </div>
      <hr />
      <CreateNoteForm createNote={createNote} />
    </Fragment>
  );
}