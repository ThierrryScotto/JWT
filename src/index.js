'use strict'

const route          = require('./router/index');
const userController = require('./controllers/userController')

route.get('/users', userController.getUsers);
route.get('/user/:userId', userController.getUserById);
route.put('/edit/user', userController.editUser);
route.post('/create/user', userController.createUser);
route.delete('/delete/user/:userId', userController.deleteUser);