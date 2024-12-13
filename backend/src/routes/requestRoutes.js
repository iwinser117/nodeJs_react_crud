const express = require('express');
const { 
  getRequests, 
  createRequest, 
  deleteRequest 
} = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { assignRequest } = require('../controllers/adminController');


const router = express.Router();

// solo para empleados y admins
router.get('/', authMiddleware, getRequests);
router.post('/', authMiddleware, createRequest);

// esto solo para admins
router.delete('/:id', authMiddleware, deleteRequest);
//esto es para crear desde admon
router.post('/insert', authMiddleware, adminMiddleware, assignRequest);

module.exports = router;