const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const mongoose = require('mongoose');

// @desc    Create a new order
// @route   POST /orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { restaurant_id, customer_name, order_type, items } = req.body;

    // Validate restaurant_id
    if (!mongoose.Types.ObjectId.isValid(restaurant_id)) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }

    // Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Extract menu item IDs
    const menuItemIds = items.map(item => item.menu_item_id);
    
    // Validate menu item IDs
    const invalidIds = menuItemIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({ message: 'Invalid menu item ID(s)' });
    }

    // Find all menu items
    const menuItems = await MenuItem.find({
      _id: { $in: menuItemIds },
      restaurant_id,
      is_available: true
    });

    // Check if all items exist and are available
    if (menuItems.length !== [...new Set(menuItemIds)].length) {
      return res.status(400).json({ 
        message: 'One or more menu items do not exist or are not available' 
      });
    }

    // Create a map of menu items for easy lookup
    const menuItemMap = menuItems.reduce((map, item) => {
      map[item._id.toString()] = item;
      return map;
    }, {});

    // Calculate totals and create order items
    let totalPrice = 0;
    const orderItems = items.map(item => {
      const menuItem = menuItemMap[item.menu_item_id];
      const itemTotal = menuItem.price * item.quantity;
      totalPrice += itemTotal;

      return {
        menu_item_id: menuItem._id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
        total: itemTotal
      };
    });

    // Create order
    const order = await Order.create({
      restaurant_id,
      customer_name,
      order_type,
      items: orderItems,
      total_price: totalPrice,
      created_at: new Date()
    });

    // Return order details
    res.status(201).json({
      _id: order._id,
      restaurant_id: order.restaurant_id,
      customer_name: order.customer_name,
      order_type: order.order_type,
      created_at: order.created_at,
      items: order.items,
      total_price: order.total_price
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Find order by ID
    const order = await Order.findById(id);

    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return order details
    res.status(200).json({
      _id: order._id,
      restaurant_id: order.restaurant_id,
      customer_name: order.customer_name,
      order_type: order.order_type,
      created_at: order.created_at,
      items: order.items,
      total_price: order.total_price
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById
};