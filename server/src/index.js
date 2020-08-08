const { ApolloServer } = require('apollo-server-express');
var express = require('express')

const typeDefs = require('./schema');
const { createStore } = require('./utils');
const connect = require('connect');
const NoteAPI = require('./datasources/note');
const UserAPI = require('./datasources/user');
const resolvers = require('./resolvers');
const store = createStore();
const isEmail = require('isemail');
const app = connect();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = req.headers && req.headers.authorization || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOne({ where: { email } });

    const user = users || null;

    return { user: { ...user.dataValues } };
  },
  dataSources: () => ({
    noteAPI: new NoteAPI({ store }),
    userAPI: new UserAPI({ store })
  }),
  typeDefs,
  resolvers,
});

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  // setHeaders: function (res, path, stat) {
  //   res.set('x-timestamp', Date.now())
  // }
}

app.use(express.static('src/assets/images', options))

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
