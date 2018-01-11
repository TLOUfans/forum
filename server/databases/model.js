'use strict'

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/forum');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('success') });

autoIncrement.initialize(db);

module.exports = function getModel(modelName) {
  let schema = require(`./schema/${modelName}`);
  return db.model(modelName, schema);
}
