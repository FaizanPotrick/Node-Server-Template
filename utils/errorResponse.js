class ErrorResponse extends Error {
  constructor(message, statusCode, type="general") {
    super(message);
    this.statusCode = statusCode;
    this.type = type

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;