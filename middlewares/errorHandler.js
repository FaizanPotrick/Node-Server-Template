const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  try {
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError")
      throw new ErrorResponse(
        err.message || "Resource not found. Invalid ObjectId",
        404
      );
    // Mongoose duplicate key
    if (err.code === 11000) {
      throw new ErrorResponse(
        err.message || "Duplicate field value entered",
        409
      );
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((er) => er.message);
      throw new ErrorResponse(message, 400);
    }

    res.status(err.statusCode || 500).json({
      error: err.message || "Internal Server Error",
    });
  } catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
};

module.exports = errorHandler;
