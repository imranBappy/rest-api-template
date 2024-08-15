const authService = require("../services/authService");

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({
      data: user,
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    next(error);
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);
    const token = authService.generateToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
exports.verifyOtpUser = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOtp({ email, otp });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
exports.requestPasswordResetUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset({ email });
    res.status(200).json({
      message: "OTP successfully send!",
    });
  } catch (error) {
    next(error);
  }
};
exports.resetPasswordUser = async (req, res, next) => {
  try {
    const { otp, newPassword } = req.body;
    await authService.resetPassword({ otp, newPassword });
  } catch (error) {
    next(error);
  }
};
