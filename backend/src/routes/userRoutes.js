const express = require('express');
const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.post('/',authMiddleware, createUser);

module.exports = router;