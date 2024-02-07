const express = require("express");
const router = express.Router();
const { header, body, cookie, param, query } = require("express-validator");

const fieldHandler = require("../middlewares/fieldHandler.middleware");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

router.get(
  "/headers",
  header("auth").trim().notEmpty().withMessage("Auth is required"),
  fieldHandler,
  (req, res) => {
    return res.json(new ApiResponse(null, "Validation passed", 200));
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
    return res.json(new ApiResponse(null, "Validation passed", 200));
  }
);

router.get(
  "/cookies",
  cookie("connect.sid").trim().notEmpty().withMessage("ID is required"),
  fieldHandler,
  (req, res) => {
    return res.json(new ApiResponse(null, "Validation passed", 200));
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
    return res.json(new ApiResponse(null, "Validation passed", 200));
  }
);

router.get(
  "/query",
  query("person").trim().notEmpty().withMessage("Person is required"),
  fieldHandler,
  (req, res) => {
    return res.json(new ApiResponse(null, "Validation passed", 200));
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
      if (email === value) {
        throw new ApiError("Email already exists", 400, "EmailExists");
      }
    }),
  body("password").isLength({ min: 5 }),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new ApiError(
        "Password confirmation does not match",
        400,
        "PasswordMismatch"
      );
    }
  }),
  fieldHandler,
  (req, res) => {
    return res.json(new ApiResponse(null, "Validation passed", 200));
  }
);

module.exports = router;
