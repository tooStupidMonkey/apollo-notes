
module.exports = {
    Query: {
      notes: async (_, { pageSize = 20, after }, { dataSources }) => {
          const allNotes = await dataSources.noteAPI.getAllNotes();
          // we want these in reverse chronological order
          allNotes.reverse();
          return {
            notes: allNotes,
          };
        },
      note: (_, { id }, { dataSources }) => dataSources.noteAPI.getNote({id}),
      me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },
    Note: {
        isDone: async (note, _, { dataSources }) =>
          dataSources.userAPI.isDone({ id: note.id }),
    },
    Mutation: {
        login: async (_, { email, password }, { dataSources }) => {
          const user = await dataSources.userAPI.findOrCreateUser({ email, password });
          if (user) return Buffer.from(email).toString('base64');
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