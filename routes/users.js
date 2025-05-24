const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers); // only use slash bc routes are cummulitive
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;

// const User = require('../models/user');

// GET /users — returns all users
// GET /users/:userId - returns a user by _id
// POST /users — creates a new user

// Create three corresponding controllers: getUsers, getUser, and createUser.

// In the body of the POST request for creating a user, pass a JSON object with two fields: name and avatar.
