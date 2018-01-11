'use strict'

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const UserSchema = mongoose.Schema({
  name: String,
  nickName: String,
  age: Number,
  sex: String,
  password: String,
  uid: Number,
  regDate: { type: Date, default: Date.now }
});

UserSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'uid' })
module.exports = UserSchema