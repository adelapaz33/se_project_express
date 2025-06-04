const router = require("express").Router();

const { login, createUser } = require("../controllers/users");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
