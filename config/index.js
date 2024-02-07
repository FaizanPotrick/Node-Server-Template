module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  PORT: process.env.PORT || 8000,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "1m",
  SESSION_SECRET : process.env.SESSION_SECRET || "mysecret",
  saltRounds: 10,
};
