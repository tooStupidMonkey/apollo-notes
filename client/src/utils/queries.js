import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_USERS = gql`
  query users {
    users {
      rating
      firstName
      lastName
      id
      avatar
    }
  }
`;

export const  SET_NOTIFICATION = gql`
  mutation setNotification($notifications: Array!) {
    setNotification(notifications: $notifications) @client
  }
`;

export const NOTIFICATIONS = gql`
  query Notifications {
    notifications @client
  }
`;

export const SIGN_UP_USER = gql`
  mutation signUp($email: String!, $password: String!, $firstName: String, $lastName: String) {
    signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName)
  }
`;

export const RAIT_USER = gql`
  mutation raitUser($id: Int!, $rating: Int) {
    raitUser(id: $id, rating: $rating) {
      user {
        rating
        firstName
        lastName
      }
    }
  }
`;
export const EDIT_USER = gql`
  mutation editUser($id: ID!, $rating: Int, $firstName: String, $lastName: String, $file: Upload) {
    editUser(id: $id, rating: $rating, firstName: $firstName, lastName: $lastName, file: $file) {
      success
      message
      user {
        rating
        firstName
        lastName
        avatar
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const EDIT_NOTE = gql`
  mutation editNote ($id: ID!, $note: String){
    editNote( id: $id, note: $note) {
      success
      message
    }
  }
`;


export const NOTES_DATA = gql`
  fragment NoteTile on Note {
    id
    note, 
    createdAt
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

export const REMOVE_NOTES = gql`
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

export const CREATE_NOTES = gql`
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