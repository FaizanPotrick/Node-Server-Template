const ApiError = require("../utils/ApiError");
const { validationResult } = require("express-validator");

const fieldHandler = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const message = Object.values(result.array()).map((er) => er.msg);
      throw new ApiError(
        message || "Field Validation failed",
        400,
        "FieldValidationFailed",
        result.array()
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fieldHandler;
