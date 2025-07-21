const router = require("express").Router();

const { login, createUser } = require("../controllers/users");

const userRouter = require("./users");

const clothingItemRouter = require("./clothingItems");

const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

module.exports = router;
