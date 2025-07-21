const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
require("dotenv").config();
const mainRouter = require("./routes/index");
// const { NOT_FOUND } = require("./utils/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");

const NotFoundError = require("./errors/not-found-err");

const app = express();
const { PORT = 3001 } = process.env;

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
}); // *** remove this code after passing review!!

app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter); // if requests are sent to / then send to userRouter

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.listen(PORT, () => {});
