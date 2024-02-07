const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config");

const user_id = "1234567890";

const Login = (req, res, next) => {
  try {
    const accessToken = jwt.sign({ _id: user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    return res
      .cookie("accessToken", accessToken)
      .json(new ApiResponse({ accessToken }, "Login successful", 200));
  } catch (err) {
    next(err);
  }
};

const VerifyToken = (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError("Token not found", 404, "TokenNotFound");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded._id !== user_id) {
      throw new ApiError("Invalid token", 401, "InvalidToken");
    }
    return res.json(
      new ApiResponse({ accessToken: token }, "Token is verified", 200)
    );
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ApiError("Token expired", 401, "Unauthorized"));
    } else if (err.name === "JsonWebTokenError") {
      return next(new ApiError("Invalid token", 401, "Unauthorized"));
    }
    next(err);
  }
};

module.exports = { Login, VerifyToken };
