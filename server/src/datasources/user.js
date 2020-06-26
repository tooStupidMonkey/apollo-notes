const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');
//import { PubSub } from 'graphql-subscriptions';
//export const pubsub = new PubSub();
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */

   async fetchUsers () {
     const store = this.store
     const users = await store.users.findAll()
     return users ? users : []
   }

  async findUser({ email: emailArg, password } = {}) {
    const store = this.store;

    if (!emailArg || !isEmail.validate(emailArg) || !password) return null;

    const users = await store.users.findOne({ where: { email: emailArg} });
    if (!users) {
      return null
    }
    const result = await bcrypt.compare(password, users.password);
    if (!result) {
      throw new Error('User not found')
    }
    return result && users ? users : null;
  }

  async createUser({ email: emailArg, password, firstName, lastName } = {}) {
    const store = this.store;
    console.log('firstName, lastName', firstName, lastName)
    if (!emailArg || !isEmail.validate(emailArg) || !password) return null;
    const hash =  await bcrypt.hash(password, saltRounds);
    if (!hash) {
      return null;
    }
    const user = await store.users.create( { email: emailArg, password: hash, firstName, lastName } );

    return user  ? user : null;
  }

  async createNotes({ note }) {
    //const userId = this.context.user.id;
    //if (!userId) return;
    let results = [];
    // if successful
    const res = await this.createNote({ note });
    const payload = {
      noteAdded: {
          id: res.id,
          note: res.note,
      }
  };
  
    if (res) results.push(res);
    return results;
  }
  async raitUser({id, rating}) {
    const res = await this.store.users.update({
      rating
    },{
      where: { id },
    });
    const user =  await this.store.users.findOne(
      { where: { id} }
    )
    return user ? user : null
  }

  async editUser({id, firstName, lastName, rating}) {
    const res = await this.store.users.update({
      firstName, lastName, rating
    },{
      where: { id },
    });
    const user =  await this.store.users.findOne(
      { where: { id} }
    )
    return user ? user : null
  }
  async createNote({ note }) {
    const userId = this.context.user.id;
    const res = await this.store.notes.findOrCreate({
      where: { userId, note },
    });
    return res && res.length ? res[0].get() : false;
  }

  async deleteNote({ noteId }) {
    const userId = this.context.user.id;
    return !!this.store.notes.destroy({ where: { userId, id: noteId } });
  }
}

module.exports = UserAPI;
