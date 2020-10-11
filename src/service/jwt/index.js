'use strict'

require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: 86400,
  })
}