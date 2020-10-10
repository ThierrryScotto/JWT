'use strict'

const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();  

    if (!users) {
      res.status(404).send('There are not users')
    }

    res.status(200).send(users);
  } catch {
    res.status(400).send('There are a internal error')
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id });

    if (!user) {
      res.status(404).send(`user ${id} not found`);
    }

    res.status(200).send(user);
  } catch {
    res.status(400).send('There are a internal error');
  }  
};

const editUser = async (req, res) => {
  const body = req.body;

  let user = await findOne({ id: body.id });
  if (!user) {
    res.status(404).send('User not found');
  }

  try {
    user = {
      name:     body.name || user.name,
      age:      body.age  || user.age,
      password: body.password || user.password
    }

    user.save();
    res.status(202).send('User edited with success');
  } 
  catch {
    res.status(400).send('There are a internal error');
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const userCreated = User.crete(body);

    res.send(201).send('User created with success');
  } catch {
    res.status(400).send('There are a internal error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = User.findOne({ id });

    if (!user) {
      res.send(404).send(`User ${id} not found`);
    }

    user.status = 1;

    res.status(202).send('User deleted');
  } catch {
    res.status(400).send('There are a internal error');
  }
}

module.exports = {
  getUsers,
  getUserById,
  editUser,
  createUser,
  deleteUser
}