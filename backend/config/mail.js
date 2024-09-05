import nodemailer from "nodemailer";
import dotenv from "dotenv";
import registerEmail from "../data/registerEmail.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = () => {
  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "anidiot78@gmail.com",
    subject: "Bazaarlia",
    text: "Hello world?",
    html: registerEmail(),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log("Email sent:", info.response);
  });
};

export default sendEmail;
