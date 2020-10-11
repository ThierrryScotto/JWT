'use strict'

const router         = require('./router/index');
const userController = require('./controllers/userController');
const auth           = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');

router.post('/authenticate', auth.check);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/:userId', authMiddleware, userController.getUserById);
router.put('/edit/user', authMiddleware, userController.editUser);
router.post('/create/user', userController.createUser);
router.delete('/delete/user/:userId', authMiddleware, userController.deleteUser);