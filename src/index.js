'use strict'

const app            = require('./router/index');
const userController = require('./controllers/userController')

app.express.get('/users', userController.getUsers);
app.express.get('/user/:userId', userController.getUserById);
app.express.put('/edit/user', userController.editUser);
app.express.post('/create/user', userController.createUser);
app.express.delete('/delete/user/:userId', userController.deleteUser);