const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const {
  BAD_REQUEST,
  NOT_FOUND,
  // INTERNAL_SERVER_ERROR,
  CONFLICT_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = NOT_FOUND;
        err.message = "User not found";
      } else if (err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(201).send(userObject);
    })
    .catch((err) => {
      if (err.code === 11000) {
        err.statusCode = CONFLICT_ERROR;
        err.message = "User with this email already exists";
      } else if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // create token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      // send token
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      } else if (err.message === "Incorrect email or password") {
        err.statusCode = UNAUTHORIZED;
        err.message = "Incorrect email or password";
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      }
      next(err);
    });
};

module.exports = { createUser, getCurrentUser, login, updateProfile };
