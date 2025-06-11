const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;
app.use(cors());
app.use(express.json());
app.use("/", mainRouter); // if requests are sent to / then send to userRouter

app.use((req, res) => {
  res.status(NOT_FOUND).json({
    message: "Requested resource not found",
  });
});


mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.listen(PORT, () => {});
