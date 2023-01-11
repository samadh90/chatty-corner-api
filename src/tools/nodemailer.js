const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const os = require('os');

require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function sendValidationEmail(to, validationLink) {
  let mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: "Email validation",
    html: `<p>Please click on the following link to validate your email address:</p>
               <p><a href="${validationLink}">${validationLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent to ${to} : ${info.response}`);
    }
  });
}

function createValidationLink(userEmail) {
  let domain = os.hostname();
  let token = crypto.randomBytes(16).toString("hex");
  let data = {
    email: userEmail,
    token: token,
  };
  let secret = process.env.JWT_SECRET;
  let options = { expiresIn: "1h" };
  let jwtToken = jwt.sign(data, secret, options);
  let validationLink = `http://${domain}/validate-email?token=${jwtToken}`;
  return { validationLink, jwtToken };
}

module.exports = {
  sendValidationEmail,
  createValidationLink,
};
