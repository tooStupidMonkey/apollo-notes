
const {ApolloError} = require('apollo-server');
const fs = require('fs');

module.exports = {
    Query: {
      notes: async (_, { pageSize = 20, after }, { dataSources }) => {
          const allNotes = await dataSources.noteAPI.getAllNotes();
          // we want these in reverse chronological order
          allNotes.reverse();
          console.log('allNotes', allNotes)
          return {
            notes: allNotes,
          };
        },
      note: (_, { id }, { dataSources }) => dataSources.noteAPI.getNote({id}),
      me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
      users: (_, {}, {dataSources}) => dataSources.userAPI.fetchUsers()
    },
    // Subscription: {
    //   noteAdded: {
    //       subscribe: () => pubsub.asyncIterator('noteAdded')
    //     }
    // },
    Mutation: {
        login: async (_, { email, password }, { dataSources }) => {
          console.log('testtt', email, password)
          const user = await dataSources.userAPI.findUser({ email, password });
          if (!user) throw new ApolloError('User not found', 404);
          console.log('useruser', Buffer.from(email).toString('base64'))
          return Buffer.from(email).toString('base64');
        },
        signUp: async (_, {email, password, firstName, lastName}, {dataSources}) => {
          const user = await dataSources.userAPI.createUser({ email, password, firstName, lastName });
          if (user) return Buffer.from(email).toString('base64');
        },
        raitUser: async (_, {id, rating}, {dataSources}) => {
          console.log('id, rating', id, rating)
          const user = await dataSources.userAPI.raitUser({id, rating})
          console.log('user', user)
          return {
            success: true,
            message: 'Raitin has been updated',
            user
          }
        },
        createNote: async (_, { note }, { dataSources }) => {
          const results = await dataSources.userAPI.createNotes({ note });
          return {
            success: results && results.length,
            message: 'note have been created successfully',
            notes: results,
          };
        },
        editNote: async (_, {id, note}, { dataSources }) =>{
          const result = await dataSources.noteAPI.editNote({id, note});
          const notes = await dataSources.noteAPI.getAllNotes();
          return {
            success: result && result.length,
            message: 'note have been created successfully',
            notes: notes,
          };
        },
        editUser: async (_, {firstName, lastName, rating, id, file}, {dataSources}) => {
          const { filename, mimetype, encoding, createReadStream } = await file;
          console.log('stream', createReadStream())
          try {

            fs.writeFile('assets/images/'+filename, createReadStream(), (err) => {
              console.log(err, err)
            })
          } catch (e) {
            console.log('e', e)
          }
          //console.log('stream, filename, mimetype, encoding', stream, filename, mimetype, encoding)
          const user = await dataSources.userAPI.editUser({id, firstName, lastName, rating})
          return {
            success: true,
            message: 'User has been updated',
            user
          }
        },
        deleteNote: async (_, { noteId }, { dataSources }) => {
          const result = await dataSources.userAPI.deleteNote({ noteId });
          if (!result)
            return {
              success: false,
              message: 'failed to remove note',
            };
      
          const note = await dataSources.noteAPI.getAllNotes();
          return {
            success: true,
            message: 'note removed',
            notes: note,
          };
        },
      },
  };