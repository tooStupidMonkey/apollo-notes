
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
    notes( 
        pageSize: Int
        after: String
    ): NoteConnection!
    note(id: ID!): Note,
    me: User
    }

    type NoteConnection {
    cursor: String!
    hasMore: Boolean!
    notes: [Note]!
    }
    type Note {
        id: ID!
        note: String
        isDone: Boolean!
    }

    type User {
        id: ID!
        email: String!
        notes: [Note]!
    }

    type Mutation {
        # if false, booking trips failed -- check errors
        createNote(note: String): NoteUpdateResponse!
        # if false, cancellation failed -- check errors
        deleteNote(noteId: ID!): NoteUpdateResponse!
        login(email: String, password: String): String # login token
        editNote(id:ID!, note:String): NoteUpdateResponse!#edit note
    }

    type NoteUpdateResponse {
        success: Boolean!
        message: String
        notes: [Note]
    }

    enum PatchSize {
        SMALL
        LARGE
    }
`;

module.exports = typeDefs;