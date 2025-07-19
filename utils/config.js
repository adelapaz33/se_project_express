// const JWT_SECRET = "mySecretKey";

// module.exports = { JWT_SECRET };

const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = {
  JWT_SECRET,
};
