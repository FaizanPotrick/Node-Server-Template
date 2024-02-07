const express = require("express");
const router = express.Router();
const {
  Login,
  VerifySession,
  Logout,
} = require("../controllers/server.controller");

router.post("/login", Login);
router.get("/verify/session", VerifySession);
router.post("/logout", Logout);

module.exports = router;