const express = require('express');
const router = express.Router();
const { createOrder, getOrderById } = require('../controllers/orderController');

// Create a new order
router.post('/', createOrder);

// Get order by ID
router.get('/:id', getOrderById);

module.exports = router;