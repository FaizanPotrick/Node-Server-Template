const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const user_id = "1234567890";
const blacklistedUsers = [];

const Login = (req, res, next) => {
  try {
    if (blacklistedUsers.includes(user_id)) {
      throw new ApiError("You are blacklisted", 403, "Blacklisted");
    }
    req.session.userId = user_id;
    return res.json(new ApiResponse(null, "Login successful", 200));
  } catch (err) {
    next(err);
  }
};

const VerifySession = (req, res, next) => {
  try {
    const userId = req.session?.userId;
    if (userId !== user_id) {
      throw new ApiError("Invalid session", 400, "InvalidSession");
    }
    return res.json(
      new ApiResponse(
        {
          userId,
        },
        "Session is verified",
        200
      )
    );
  } catch (err) {
    next(err);
  }
};

const Logout = (req, res, next) => {
  try {
    req.session.destroy();
    return res.json(new ApiResponse(null, "Logged out successfully", 200));
  } catch (err) {
    next(err);
  }
};

module.exports = { Login, VerifySession, Logout };
