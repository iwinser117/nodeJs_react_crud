const express = require('express');
const { 
  getRequests, 
  createRequest, 
  deleteRequest 
} = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// solo para empleados y admins
router.get('/', authMiddleware, getRequests);
router.post('/', authMiddleware, createRequest);

// esto solo para admins
router.delete('/:id', authMiddleware, deleteRequest);

module.exports = router;