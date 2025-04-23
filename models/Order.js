const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menu_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'MenuItem'
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Restaurant'
  },
  customer_name: {
    type: String,
    required: true,
    trim: true
  },
  order_type: {
    type: String,
    required: true,
    enum: ['DINE_IN', 'TAKEAWAY', 'DELIVERY']
  },
  items: [orderItemSchema],
  total_price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);