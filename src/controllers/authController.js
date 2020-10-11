'use strict'

const { compare }       = require('../service/bcrypt/index'); 
const { generateToken } = require('../service/jwt/index');

const User = require('../models/user');

const check = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (!await compare(password, user.password)) {
    return res.status(404).send({ error: 'Invalid password' });
  }

  const token = generateToken(user.id);

  res.send({ user, token });
}

module.exports = {
  check
}