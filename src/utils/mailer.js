const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "digitalseative@gmail.com",
    pass: "suijqezakkjqpaxo",
  },
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: "digitalseative@gmail.com",
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendMail;
