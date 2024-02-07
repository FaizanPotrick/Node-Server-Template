const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  try {
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError")
      throw new ApiError(
        err.message || "Resource not found. Invalid ObjectId",
        404,
        "NotFound"
      );

    // Mongoose duplicate key
    if (err.code === 11000) {
      throw new ApiError(
        err.message || "Duplicate field value entered",
        409,
        "DuplicateField"
      );
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((er) => er.message);
      throw new ApiError(message, 400, "ValidationError", err.errors);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const name = err.name || "ApiError";
    const errors = err.errors || [];

    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      name: name,
      errors: errors,
      success: false,
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      name: err.name,
      errors: err.errors,
      success: false,
    });
  }
};

module.exports = errorHandler;
