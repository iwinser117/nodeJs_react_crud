const express = require('express');
const { getUsers, createUser, getUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.post('/', authMiddleware, createUser);
router.post('/user', authMiddleware, getUser);

module.exports = router;
