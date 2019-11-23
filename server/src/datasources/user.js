const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');
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
  async findOrCreateUser({ email: emailArg, password } = {}) {
    const store = this.store;
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email) || !password) return null;
    const hash =  await bcrypt.hash(password, saltRounds);
    if (!hash) {
      return null;
    }
    const users = await store.users.findOrCreate({ where: { email, password: hash } });
    return users && users[0] ? users[0] : null;
  }

  async createNotes({ note }) {
    //console.log('this.context', this.context, note)
    const userId = this.context.user.id;
    if (!userId) return;
    let results = [];
    // if successful
    const res = await this.createNote({ note });
    if (res) results.push(res);
    return results;
  }
  isDone ({id}) {
    return true;
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
