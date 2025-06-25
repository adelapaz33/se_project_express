# WTWR (What to Wear?): Back End Description
 
It sets up a server using Express.js and connects to a MongoDB database to manage users and clothing items. The project includes well-structured routing, controller logic, and error handling to ensure stability and maintainability. API endpoints are tested using Postman.

# Features 
- Modular routes and controller structure
- Error handling

# Tech stack used

- Express.js
- Node.js
- MongoDB
- Postman

# API Endpoints  
GET     /user                   - Get user by any criteria
GET     /user/:userId           - Get user by Id
POST    /user                   - Create new user 
GET     /item                   - Get clothing item 
POST    /item                   - Create new clothing item
DELETE  /item/:itemId           - Delete clothing item 
PUT     /item/:itemId/likes     - like a clothing item
DELETE  /item/:itemUId/likes    -Unlike a clothing item
 
 Deployment Link: https://adelapaz33.github.io/se_project_express/