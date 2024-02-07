const express = require("express");
const router = express.Router();
const { SetCookie, VerifyCookie } = require("../controllers/cookie.controller");

router.post("/", SetCookie);
router.get("/verify", VerifyCookie);

module.exports = router;
