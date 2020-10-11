'use strict'

const User                 = require('../models/user');
const { generateToken }    = require('../services/jwt');
const { httpErrorMessage } = require('../util/index');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();  

    if (!users) {
      return httpErrorMessage(404, res);
    }

    return res.status(200).send(users);
  } catch {
    return httpErrorMessage(500, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return httpErrorMessage(404, res);
    }

    res.status(200).send(user);
  } catch {
    return httpErrorMessage(500, res);
  }  
};

const editUser = async (req, res) => {
  const body = req.body;
  let user = await User.findOne({ _id: body.id });

  if (!user) {
    return httpErrorMessage(404, res);
  }

  try {  
   await User.updateOne({ _id: body.id }, { 
      email:    body.email || user.email, 
      status:   body.status || user.status,
      password: body.password || user.password
    });

    return res.status(202).send({ success: 'User edited with success' });
  } 
  catch {
    return httpErrorMessage(500, res);
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const user = await User.findOne({ email: body.email });

    if (user) {
      return httpErrorMessage(400, res);
    }

    const userCreated = await User.create(body);
    
    const token = generateToken(userCreated.id);

    return res.status(201).send({ userCreated, token });
  } catch(error) {
    return httpErrorMessage(500, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await User.findOne({ _id: userId, status: '0' });

    if (!user) {
      return httpErrorMessage(404, res);
    }

    const userDeleted = await User.updateOne({ _id: userId }, { status: '1' });

    if (!userDeleted) {
      return httpErrorMessage(406, res);
    }

    return res.status(202).send('User deleted');
  } catch {
    return httpErrorMessage(500, res);
  }
}

module.exports = {
  getUsers,
  getUserById,
  editUser,
  createUser,
  deleteUser
}