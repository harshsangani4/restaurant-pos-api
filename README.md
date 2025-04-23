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
    {"menu_item_id": "6808bb01237450f190f025ef", "quantity": 2}, 
    {"menu_item_id": "6808bb01237450f190f025f0", "quantity": 1}
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
- **URL Parameters:** `id=6808bdb8a6bbe7a4c01dd866`
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
git clone https://github.com/harshsangani4/restaurant-pos-api.git
cd restaurant-pos-api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
PORT=5000
MONGO_URI=mongodb+srv://harsh15:2912@cluster0.mongodb.net/restaurant-pos
```

4. Seed the database
```bash
npm run seed
```

5. Start the development server
```bash
npm run dev
```

### Deployment

This API is deployed on [Render](https://render.com) with the following configuration:

- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `PORT`: 10000
  - `MONGO_URI`: MongoDB Atlas connection string

## API Base URL

The API is deployed at: https://restaurant-pos-api.onrender.com

## Testing the API

You can test the API using cURL:

### Create an order
```bash
curl -X POST https://restaurant-pos-api.onrender.com/orders \
-H "Content-Type: application/json" \
-d '{"restaurant_id":"643a9a1f2f1234567890abcd", "customer_name":"Alice", "order_type":"DINE_IN", "items":[{"menu_item_id":"643a9b2f1d1234567890efgh", "quantity": 2}, {"menu_item_id":"643a9b2f1d1234567890ijkl", "quantity": 1}]}'
```

### Get order details
```bash
curl https://restaurant-pos-api.onrender.com/orders/643fabc1234def56789ghijk
```

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
  "name": "Margherita Pizza",
  "price": 300,
  "category": "Pizza",
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
      "name": "Margherita Pizza",
      "quantity": 2,
      "price": 300,
      "total": 600
    }
  ],
  "total_price": 600
}
```