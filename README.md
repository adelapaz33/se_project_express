# WTWR (What to Wear?): Backend Description

This project sets up a backend server using Express.js and connects to a MongoDB database to manage users and clothing items. It features structured routing, controller logic, and robust error handling to ensure stability and maintainability. All API endpoints were tested using Postman.

## Features

- Modular route and controller structure
- Centralized error handling
- Secure password hashing and JWT-based authentication
- MongoDB for storing users and clothing items

## Tech Stack

- Express.js
- Node.js
- MongoDB
- Mongoose
- Postman

## API Endpoints

### User Routes

- `GET /user` – Get all users
- `GET /user/:userId` – Get a specific user by ID
- `POST /user` – Create a new user

### Clothing Item Routes

- `GET /item` – Get all clothing items
- `POST /item` – Create a new clothing item
- `DELETE /item/:itemId` – Delete a clothing item
- `PUT /item/:itemId/likes` – Like a clothing item
- `DELETE /item/:itemId/likes` – Unlike a clothing item

> 🔍 Note: Endpoints are protected where applicable and require valid authentication tokens.

## Deployment Links

- **Backend GitHub Repository:** [https://github.com/adelapaz33/se_project_express](https://github.com/adelapaz33/se_project_express)

- **Deployed Domains** (available until September 2025):
  - **Frontend:** [https://ttwtwr.twilightparadox.com](https://ttwtwr.twilightparadox.com)
  - **Backend (API):** [https://api.ttwtwr.twilightparadox.com](https://api.ttwtwr.twilightparadox.com)
