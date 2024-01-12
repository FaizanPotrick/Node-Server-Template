const express = require("express");
const router = express.Router();
const ErrorResponse = require("../utils/errorResponse");

router.post("/", (req, res, next) => {
  try {
    res
      .cookie("token", "this is your token", {
        maxAge: 1000 * 60,
      })
      .send("Cookie is set");
  } catch (err) {
    next(err);
  }
});

router.get("/verify", (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new ErrorResponse("Token not found", 404);
    res.send(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
