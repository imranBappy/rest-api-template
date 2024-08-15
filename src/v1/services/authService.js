// src/v1/services/authService.js
const bcrypt = require("bcryptjs");
const prisma = require("../../database/prisma");
const { BadRequestError, UnauthorizedError } = require("../../utils/errors");
const { sendVerificationEmail } = require("./emailService");
const generateOtp = require("../../utils/generateOtp");

const registerUser = async (name, email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otpExpiry = new Date(
    Date.now() + parseInt(process.env.TOKEN_EXPIRY_TIME)
  ); // OTP valid for 15 minutes
  return await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
      },
    });
    await prisma.otp.create({
      data: {
        otp,
        expiry: otpExpiry,
        userId: user.id,
      },
    });
    await sendVerificationEmail(name, email, otp);
    return user;
  });
};
const requestPasswordReset = async ({ email }) => {
  const isExitUser = await prisma.user.findUnique({ where: { email: email } });
  if (!isExitUser) {
    throw new BadRequestError("Invalid email!");
  }
  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + config.otp.expiry); // OTP valid for 15 minutes
  return await prisma.otp.create({
    data: {
      otp,
      expiry: otpExpiry,
      userId: isExitUser.id,
    },
  });
};
const resetPassword = async ({ otp, newPassword }) => {
  const otpRecord = await prisma.otp.findFirst({
    where: {
      otp,
      expiry: {
        gt: new Date(),
      },
    },
  });

  if (!otpRecord) {
    throw new Error("Invalid or expired OTP");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return await prisma.$transaction(async (prisma) => {
    await prisma.user.update({
      where: { id: otpRecord.userId },
      data: { password: hashedPassword },
    });
    await prisma.otp.delete({
      where: { id: otpRecord.id },
    });
  });
};
const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError("Invalid credentials");
  }
  return user;
};
const verifyOtp = async ({ email, otp }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const otpRecord = await prisma.otp.findFirst({
      where: {
        userId: user.id,
        otp: otp,
        expiry: {
          gt: new Date(),
        },
      },
    });

    if (!otpRecord) {
      throw new Error("Invalid or expired OTP");
    }
    console.log(otpRecord);

    // await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where:{id:user.id}
      })
      await prisma.otp.delete({
        where: { id: otpRecord.id },
      });
    // })

    return { message: "Email verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  verifyOtp,
  requestPasswordReset,
  resetPassword,
};
