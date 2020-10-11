'use strict'

const mongoose        = require('../services/db/index');
const { generateHash } = require('../services/bcrypt/index');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true, select: false },
  status:    { type: String, default: '0', required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  const hash = await generateHash(this.password);
  this.password = hash;
  
  next();
});

module.exports = mongoose.model('User', userSchema);
