const { check, body } = require("express-validator");

const registerValidation = [
  check("name", "Username is required").not().isEmpty().trim(),
  check("email", "Please include a valid email").isEmail().trim(),
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain a special character."),
];

const loginValidation = [
  check("email", "Please include a valid email").isEmail().trim(),
  check("password", "Password is required").exists().trim(),
];

const otpValidation = [
  check("email", "Please include a valid email").isEmail().trim(),
  check("otp", "Place include a valid otp").isString().exists(),
];
const requestPasswordResetValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .trim(),
];
const passwordResetValidation = [
  check("otp", "Place include a valid otp").isNumeric().exists(),
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain a special character."),
];
module.exports = {
  registerValidation,
  loginValidation,
  otpValidation,
  requestPasswordResetValidation,
  passwordResetValidation,
};
