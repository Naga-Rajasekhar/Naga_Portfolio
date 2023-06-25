const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "rajasekhar9860@gmail.com",
      pass: "Raja@1998",
    },
  });

  // Define email options
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "rajasekhar9860@gmail.com",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
