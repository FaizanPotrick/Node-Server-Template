const ErrorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

const fieldHandler = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const message = Object.values(result.array()).map((er) => er.msg);
      throw new ErrorResponse(message || "Field Validation failed", 400);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fieldHandler;
