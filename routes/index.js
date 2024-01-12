const express = require("express");
const router = express.Router();
const { header, body, cookie, param, query } = require("express-validator");

const fieldHandler = require("../middlewares/fieldHandler");
const ErrorResponse = require("../utils/errorResponse");

router.get(
  "/headers",
  header("auth").trim().notEmpty().withMessage("Auth is required"),
  fieldHandler,
  (req, res) => {
    res.send("Validation passed");
  }
);

router.post(
  "/body",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("age").trim().optional().isInt().withMessage("Age should be integer"),
  body("users.*.name").trim().notEmpty().withMessage("Name is required"),
  body("users.*.email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  fieldHandler,
  (req, res) => {
    res.send("Validation passed");
  }
);

router.get(
  "/cookies",
  cookie("connect.sid").trim().notEmpty().withMessage("ID is required"),
  fieldHandler,
  (req, res) => {
    res.send("Validation passed");
  }
);

router.get(
  "/params/:id",
  param("id")
    .trim()
    .notEmpty()
    .withMessage("ID is required")
    .isAlphanumeric()
    .withMessage("ID should be alphanumeric"),
  fieldHandler,
  (req, res) => {
    res.send("Validation passed");
  }
);

router.get(
  "/query",
  query("person").trim().notEmpty().withMessage("Person is required"),
  fieldHandler,
  (req, res) => {
    res.send("Validation passed");
  }
);

router.post(
  "/custom",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value, { req, res, next }) => {
      const email = "email1@address.com";
      if (email === value) throw new ErrorResponse("Email already exists", 400);
    }),
  body("password").isLength({ min: 5 }),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new ErrorResponse("Password confirmation does not match", 400);
  }),
  fieldHandler,
  (req, res) => {
    res.send("Validation passed");
  }
);

module.exports = router;
