class ApiError extends Error {
  constructor(message = "Something went wrong", statusCode, name,  errors = [], stack="") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = name || "ApiError";
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
