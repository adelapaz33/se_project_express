const clothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const getClothingItems = (req, res, next) => {
  console.log("GET /items route hit");
  clothingItem
    .find({})
    .then((items) => {
      console.log("Items found:", items);
      res.status(200).send(items);
    })
    .catch((err) => {
      next(err);
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      }
      next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(FORBIDDEN)
          .json({ message: "You are unable to delete this item" });
      }
      return clothingItem.deleteOne(item).then(() => {
        res.status(200).json({ message: "Item deleted successfully" });
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = NOT_FOUND;
        err.message = "Item not found";
      } else if (err.name === "CastError" || err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid item ID";
      }
      next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      }
      next(err);
    });
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid data provided";
      }
      next(err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
};
