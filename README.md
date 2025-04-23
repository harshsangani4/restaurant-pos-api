# Restaurant POS API

A backend API for a restaurant order management system that allows creating orders and retrieving order details.

## Features

- Create new orders with validation
- Retrieve order details
- Support for multiple restaurants and menus
- MongoDB integration for data persistence

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Environment variables with dotenv

## Project Structure

```
restaurant-pos-api/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── models/         # MongoDB schemas
├── routes/         # API routes
├── seeds/          # Seed data for database
├── .env            # Environment variables
├── server.js       # Entry point
└── README.md       # Documentation
```

## API Endpoints

### Create Order

- **URL:** `/orders`
- **Method:** `POST`
- **Request Body:**
```json
{
  "restaurant_id": "6808bb01237450f190f025e9",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "items": [
    { "menu_item_id": "6808bb01237450f190f025ef", "quantity": 2 },
    { "menu_item_id": "6808bb01237450f190f025f0", "quantity": 1 }
  ]
}
```
- **Success Response:** `201 Created`
```json
{
  "_id": "6808bdb8a6bbe7a4c01dd866",
  "restaurant_id": "6808bb01237450f190f025e9",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "created_at": "2025-04-23T10:15:20.640Z",
  "items": [
    {
      "menu_item_id": "6808bb01237450f190f025ef",
      "name": "Garlic Bread",
      "quantity": 2,
      "price": 150,
      "total": 300,
      "_id": "6808bdb8a6bbe7a4c01dd867"
    },
    {
      "menu_item_id": "6808bb01237450f190f025f0",
      "name": "Coke",
      "quantity": 1,
      "price": 60,
      "total": 60,
      "_id": "6808bdb8a6bbe7a4c01dd868"
    }
  ],
  "total_price": 360
}
```

### Get Order Details

- **URL:** `/orders/:id`
- **Method:** `GET`
- **URL Parameters:** `id=[MongoDB ObjectId]`
- **Success Response:** `200 OK`
```json
{
  "_id": "6808bdb8a6bbe7a4c01dd866",
  "restaurant_id": "6808bb01237450f190f025e9",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "created_at": "2025-04-23T10:15:20.640Z",
  "items": [
    {
      "menu_item_id": "6808bb01237450f190f025ef",
      "name": "Garlic Bread",
      "quantity": 2,
      "price": 150,
      "total": 300,
      "_id": "6808bdb8a6bbe7a4c01dd867"
    },
    {
      "menu_item_id": "6808bb01237450f190f025f0",
      "name": "Coke",
      "quantity": 1,
      "price": 60,
      "total": 60,
      "_id": "6808bdb8a6bbe7a4c01dd868"
    }
  ],
  "total_price": 360
}
```

## Setup Instructions

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/restaurant-pos-api.git
cd restaurant-pos-api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/restaurant-pos?retryWrites=true&w=majority
```

4. Seed the database
```bash
npm run seed
```

5. Start the development server
```bash
npm run dev
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new free tier cluster
3. Set up database access with a username and password
4. Configure network access (allow access from your IP or anywhere for development)
5. Get your connection string from the "Connect" button
6. Replace `<username>` and `<password>` in the connection string with your credentials
7. Add the connection string to your `.env` file

### Deployment

This API can be deployed on [Render](https://render.com) with the following configuration:

- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `PORT`: 5000
  - `MONGO_URI`: MongoDB Atlas connection string

## Testing the API

You can test the API using Postman:
[TEST](https://harshsangani.postman.co/workspace/Harsh-Sangani's-Workspace~9a3d9c04-c523-4636-8f28-ccd61a0646f7/collection/44001030-282f4f21-c2e8-40ca-b79c-ee964322acad?action=share&creator=44001030)

### Create an order
1. Create a new POST request to `/orders`
2. Set Content-Type header to `application/json`
3. Set the request body to:
```json
{
  "restaurant_id": "6808bb01237450f190f025e9",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "items": [
    {"menu_item_id": "6808bb01237450f190f025ef", "quantity": 2},
    {"menu_item_id": "6808bb01237450f190f025f0", "quantity": 1}
  ]
}
```
4. Send the request

### Get order details
1. Create a new GET request to `/orders/6808bdb8a6bbe7a4c01dd866`
2. Send the request

## Database Schema

### Restaurants Collection
```javascript
{
  "_id": ObjectId,
  "name": "Pizza Palace"
}
```

### Menu Items Collection
```javascript
{
  "_id": ObjectId,
  "restaurant_id": ObjectId,
  "name": "Garlic Bread",
  "price": 150,
  "category": "Sides",
  "is_available": true
}
```

### Orders Collection
```javascript
{
  "_id": ObjectId,
  "restaurant_id": ObjectId,
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "created_at": Date,
  "items": [
    {
      "menu_item_id": ObjectId,
      "name": "Garlic Bread",
      "quantity": 2,
      "price": 150,
      "total": 300
    }
  ],
  "total_price": 300
}
```
