const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');

const NoteAPI = require('./datasources/note');
const UserAPI = require('./datasources/user');
const resolvers = require('./resolvers');
const store = createStore();
const isEmail = require('isemail');

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
  // subscriptions: {
  //   onConnect: (connectionParams, webSocket) => {
  //     if (connectionParams.authToken) {
  //       return validateToken(connectionParams.authToken)
  //         .then(findUser(connectionParams.authToken))
  //         .then(user => {
  //           return {
  //             currentUser: user,
  //           };
  //         });
  //     }

  //     throw new Error('Missing auth token!');
  //   },
  // },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});