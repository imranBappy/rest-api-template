const router = require("express").Router();
const rateLimitMiddleware = require("../../middlewares/reateLimiteMiddleware");
const authController = require("../controllers/authControllers");
const {
  registerValidation,
  loginValidation,
  passwordResetValidation,
  requestPasswordResetValidation,
  otpValidation,
} = require("../validations/authValidations");

router.post(
  "/register",
  rateLimitMiddleware(),
  registerValidation,
  authController.registerUser
);
router.post(
  "/login",
  rateLimitMiddleware(),
  loginValidation,
  authController.loginUser
);
router.post(
  "/verify-otp",
  // rateLimitMiddleware(),
  otpValidation,
  authController.verifyOtpUser
);
router.post(
  "/request-password-reset",
  rateLimitMiddleware(),
  requestPasswordResetValidation,
  authController.requestPasswordResetUser
);
router.post(
  "/password-reset",
  rateLimitMiddleware(),
  passwordResetValidation,
  authController.resetPasswordUser
);

module.exports = router;
