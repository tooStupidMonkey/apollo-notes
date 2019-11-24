const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };
  
  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });


  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: SQL.STRING,
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
    token: SQL.STRING,
  });

  const notes = db.define('note', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    note: SQL.INTEGER,
    userId: SQL.INTEGER,
  });
  db.sync();
  return { users, notes };
};
