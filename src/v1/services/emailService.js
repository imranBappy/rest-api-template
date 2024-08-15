const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (username, email, otp) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    "otpEmail.ejs"
  );

  const data = {
    username,
    otp,
    companyName: "Your Company Name",
    year: new Date().getFullYear(),
  };

  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: html,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
