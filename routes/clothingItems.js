const router = require("express").Router();
const { validateCardBody, validateId } = require("../middlewares/validation");
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// public route

router.get("/", getClothingItems);

//protected routes

router.post("/", auth, validateCardBody, createClothingItem);
router.delete("/:itemId", auth, validateId, deleteClothingItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

module.exports = router;
