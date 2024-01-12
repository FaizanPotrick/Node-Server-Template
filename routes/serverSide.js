const express = require("express");
const router = express.Router();
const ErrorResponse = require("../utils/errorResponse");

const user_id = "1234567890";
const blacklistedUsers = [];

router.post("/login", (req, res, next) => {
  try {
    if (blacklistedUsers.includes(user_id))
      throw new ErrorResponse("You are blacklisted", 403);
    req.session.userId = user_id;
    res.send({ message: "You are logged in" });
  } catch (err) {
    next(err);
  }
});

router.get("/verify/session", (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (userId !== user_id) throw new ErrorResponse("Invalid session", 400);
    res.send(userId);
  } catch (err) {
    next(err);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "Logged out successfully" });
});

module.exports = router;
