const bcrypt = require("bcryptjs");
const generateToken = (user) => {
  const payload = { userId: user.id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
module.exports = generateToken;