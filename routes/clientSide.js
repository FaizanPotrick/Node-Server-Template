const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config");
const ErrorResponse = require("../utils/errorResponse");

const user_id = "1234567890";

router.post("/login", (req, res, next) => {
  try {
    const accessToken = jwt.sign({ _id: user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
    res.header("authorization", accessToken).send({
      message: "You are logged in",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/verify/token", (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    if (decoded._id !== user_id) throw new ErrorResponse("Invalid token", 400);
    res.send(decoded);
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return next(new ErrorResponse("Token expired", 400));
    next(err);
  }
});

module.exports = router;
