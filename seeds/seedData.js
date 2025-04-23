const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();

    // Create restaurants
    const restaurant1 = await Restaurant.create({
      name: 'Pizza Palace'
    });

    const restaurant2 = await Restaurant.create({
      name: 'Burger Bistro'
    });

    console.log('Restaurants created');

    // Create menu items for Pizza Palace
    await MenuItem.create([
      {
        restaurant_id: restaurant1._id,
        name: 'Margherita Pizza',
        price: 300,
        category: 'Pizza',
        is_available: true
      },
      {
        restaurant_id: restaurant1._id,
        name: 'Pepperoni Pizza',
        price: 400,
        category: 'Pizza',
        is_available: true
      },
      {
        restaurant_id: restaurant1._id,
        name: 'Garlic Bread',
        price: 150,
        category: 'Sides',
        is_available: true
      },
      {
        restaurant_id: restaurant1._id,
        name: 'Coke',
        price: 60,
        category: 'Beverages',
        is_available: true
      }
    ]);

    // Create menu items for Burger Bistro
    await MenuItem.create([
      {
        restaurant_id: restaurant2._id,
        name: 'Classic Burger',
        price: 250,
        category: 'Burgers',
        is_available: true
      },
      {
        restaurant_id: restaurant2._id,
        name: 'Cheese Burger',
        price: 300,
        category: 'Burgers',
        is_available: true
      },
      {
        restaurant_id: restaurant2._id,
        name: 'French Fries',
        price: 120,
        category: 'Sides',
        is_available: true
      },
      {
        restaurant_id: restaurant2._id,
        name: 'Iced Tea',
        price: 80,
        category: 'Beverages',
        is_available: false
      }
    ]);

    console.log('Menu items created');
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();