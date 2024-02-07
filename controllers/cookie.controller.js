const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const SetCookie = (req, res, next) => {
  try {
    const token = "this is your token";
    return res
      .cookie("token", token, {
        maxAge: 1000 * 60, // 1 minute
      })
      .json(new ApiResponse({ token }, "Cookie is set", 200));
  } catch (err) {
    next(err);
  }
};

const VerifyCookie = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new ApiError("Token not found", 404, "TokenNotFound");
    }
    return res.json(new ApiResponse({ token }, "Cookie is verified", 200));
  } catch (err) {
    next(err);
  }
};

module.exports = { SetCookie, VerifyCookie };
