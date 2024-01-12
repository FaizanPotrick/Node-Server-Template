module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "1m",
  saltRounds: 10,
};
