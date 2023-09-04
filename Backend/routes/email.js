const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/', (req, res) => {
    console.log(req.body);
  const { recievers, title, message } = req.body;
  const recipientEmails = recievers;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Send email to each subscriber
  for (const email of recipientEmails) {
    // Construct the email message
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'New Email from Demo',
      text: `
        Subject: ${title}
        Message: ${message}
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  }
});

module.exports = router;
