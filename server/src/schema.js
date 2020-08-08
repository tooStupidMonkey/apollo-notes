
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
    notes( 
        pageSize: Int
        after: String
    ): NoteConnection!
    note(id: ID!): Note,
    me: User,
    users: [User]
    }
    
    type UsersList {
        users:[User]
    }

    type NoteConnection {
    cursor: String!
    hasMore: Boolean!
    notes: [Note]!
    }
    type Note {
        id: ID!
        note: String
        createdAt: String
    }

    type User {
        id: ID!
        email: String!
        notes: [Note]!
        firstName: String
        lastName: String
        rating: Int
        avatar: String
    }

    type Mutation {
        # if false, booking trips failed -- check errors
        createNote(note: String): NoteUpdateResponse!
        # if false, cancellation failed -- check errors
        deleteNote(noteId: ID!): NoteUpdateResponse!
        raitUser(id: Int!, rating: Int): RatingUpdateResponse!
        login(email: String, password: String): String # login token
        signUp(email: String, password: String, firstName: String, lastName: String): String # login token
        editNote(id:ID!, note:String): NoteUpdateResponse!#edit note
        editUser(id: ID!, firstName: String, lastName: String, rating: Int, file: Upload) : UserUpdateResponse
    }

    type NoteUpdateResponse {
        success: Boolean!
        message: String
        notes: [Note]
    }
    type UserUpdateResponse {
        success: Boolean!
        message: String
        user: User
    }
    type RatingUpdateResponse {
        success: Boolean!
        message: String
        user: User
    }
    enum PatchSize {
        SMALL
        LARGE
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

`;

module.exports = typeDefs;