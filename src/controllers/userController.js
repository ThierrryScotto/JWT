'use strict'

const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();  

    if (!users) {
      return res.status(404).send('There are not users')
    }

    return res.status(200).send(users);
  } catch {
    return res.status(400).send('There are a internal error')
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
    res.status(400).send('There are a internal error');
  }  
};

const editUser = async (req, res) => {
  const body = req.body;
  let user = await User.findOne({ _id: body.id });
  if (!user) {
    return res.status(404).send('User not found');
  }
  
  try {
    user = {
      name:     body.name || user.name,
      age:      body.age  || user.age,
      password: body.password || user.password
    }
    
    await user.save(user);
    return res.status(202).send(user);
  } 
  catch {
    return res.status(400).send('There are a internal error');
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const userCreated = await User.create(body);

    return res.status(201).send(userCreated);
  } catch(error) {
    return res.status(400).send('There are a internal error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = User.findOne({ id });

    if (!user) {
      return res.send(404).send(`User ${id} not found`);
    }

    user.status = 1;

    return res.status(202).send('User deleted');
  } catch {
    return res.status(400).send('There are a internal error');
  }
}

module.exports = {
  getUsers,
  getUserById,
  editUser,
  createUser,
  deleteUser
}