'use strict'

const router         = require('./router/index');
const userController = require('./controllers/userController');
const auth           = require('./controllers/authController');

router.post('/authenticate', auth.check);
router.get('/users', userController.getUsers);
router.get('/user/:userId', userController.getUserById);
router.put('/edit/user', userController.editUser);
router.post('/create/user', userController.createUser);
router.delete('/delete/user/:userId', userController.deleteUser);