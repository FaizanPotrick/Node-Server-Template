const express = require("express");
const router = express.Router();
const { Login, VerifyToken } = require("../controllers/client.controller");

router.post("/login", Login);
router.get("/verify/token", VerifyToken);

module.exports = router;
