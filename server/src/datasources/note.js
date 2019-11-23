const { DataSource } = require('apollo-datasource');

class NoteAPI extends DataSource {
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


  async getNote({ id }) {
    const userId = this.context.user.id;
    if (!userId) return;
    const res = await this.store.notes.findOne({
      where: { userId, id },
    });
    return res ? res : false;
  }

  async getNotesByIds ({notesIds}) {
    const userId = this.context.user.id;
    if (!userId) return;
    const res = await this.store.notes.findAll({
      where: { userId },
      // in: {
      //   id: notesIds
      // }
    });
    return res ? res : false;
  }
  async editNote({id, note}) {
    const userId = this.context.user.id;
    if (!userId) return;
    const res = await this.store.notes.update({
      note
    },{
      where: { userId, id },
    });
    return res ? res : false;
  }
  
  async getAllNotes () {
    const userId = this.context.user.id;
    const res = await this.store.notes.findAll({
      where: { userId },
    });
    return res ? res : false;
  }
}

module.exports = NoteAPI;
