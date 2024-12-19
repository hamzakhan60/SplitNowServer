const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Nodemailer Transport Configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use another service like Outlook, Yahoo, etc.
  auth: {
    user: "hghauri30@gmail.com", // Your email address
    pass: "ghauri@30#", // Your email password or App Password
  },
});

// Endpoint to handle notifications
app.post("/send-email", async (req, res) => {
  try {
    const { user_email, subject, message } = req.body;

    // Sending email
    const mailOptions = {
      from: "hghauri30@gmail.com",
      to: user_email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${user_email}`);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
