'use strict'

const User              = require('../models/user');
const { generateHash }  = require('../services/bcrypt/index');
const { generateToken } = require('../services/jwt');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();  

    if (!users) {
      return res.status(404).send('There are not users')
    }

    return res.status(200).send(users);
  } catch {
    return res.status(400).send('There was a internal error')
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).send(`user ${id} not found`);
    }

    res.status(200).send(user);
  } catch {
    res.status(400).send('There was a internal error');
  }  
};

const editUser = async (req, res) => {
  const body = req.body;
  let user = await User.findOne({ _id: body.id });

  if (!user) {
    return res.status(404).send('User not found');
  }

  try {  
   let userEdited = await User.updateOne({ _id: body.id }, { 
      email:     body.email   || user.email, 
      status:   body.status || user.status,
      password: body.password || user.password
    });

    return res.status(202).send(userEdited);
  } 
  catch {
    return res.status(400).send('There was a internal error');
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const user = await User.findOne({ email: body.email });

    if (user) {
      return res.status(400).send({ error: 'User already exist' })
    }

    const userCreated = await User.create(body);
    console.log('--A--')
    const token = generateToken(userCreated.id);

    return res.status(201).send({ userCreated, token });
  } catch(error) {
    return res.status(400).send('There was a internal error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await User.findOne({ _id: userId, status: '0' });

    if (!user) {
      return res.send(404).send(`User ${userId} not found`);
    }

    const userDeleted = await User.updateOne({ _id: userId }, { status: '1' });

    if (!userDeleted) {
      return res.status(404).send(`User ${userId} not deleted`);
    }

    return res.status(202).send('User deleted');
  } catch {
    return res.status(400).send('There was a internal error');
  }
}

module.exports = {
  getUsers,
  getUserById,
  editUser,
  createUser,
  deleteUser
}