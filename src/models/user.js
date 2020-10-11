'use strict'

const mongoose = require('../service/db/index');

const Schema = mongoose.Schema;

const user = new Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true, select: false },
  status:    { type: String, default: '0', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', user);
