const PORT = 4000;
const express = require("express");

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const server = express();

server.use(express.urlencoded());
// server.use(express.json());
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // Replace with your provider's SMTP server
  port: 465, // Port may vary depending on your provider
  secure: true, // Use true for TLS, false for non-TLS (consult your provider)
  auth: {
    user: process.env.USER_NAME, // Replace with your email address
    pass: process.env.USER_PASS, // Replace with your email password
  },
});

server.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Form</title>
        <style>
          /* Basic CSS for styling the form */
          /* Reset some default browser styles */
          /* Reset some default browser styles */
          /* Reset some default browser styles */
          /* Reset some default browser styles */
          /* Reset some default browser styles */
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          
          body {
              font-family: 'Arial', sans-serif;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              background: linear-gradient(135deg, #000000, #660000);
              animation: backgroundAnimate 10s linear infinite;
              position: relative;
          }
          
          @keyframes backgroundAnimate {
              0% { background: linear-gradient(135deg, #000000, #660000); }
              50% { background: linear-gradient(135deg, #330000, #990000); }
              100% { background: linear-gradient(135deg, #000000, #660000); }
          }
          
          .background {
              position: absolute;
              width: 100%;
              height: 100%;
              overflow: hidden;
          }
          
          .stars {
              position: absolute;
              width: 2px;
              height: 2px;
              background: white;
              opacity: 0.8;
              border-radius: 50%;
              animation: starGlow 2s infinite alternate;
          }
          
          @keyframes starGlow {
              from { opacity: 0.5; transform: scale(1); }
              to { opacity: 1; transform: scale(1.5); }
          }
          
          .form-container {
              background: #fff;
              padding: 20px 40px;
              border-radius: 10px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
              position: relative;
              z-index: 1;
              width: 100%;
              max-width: 400px;
              transform: translateY(0);
              transition: transform 0.5s;
          }
          
          .form-container:hover {
              transform: translateY(-10px);
          }
          
          h2 {
              text-align: center;
              margin-bottom: 20px;
              color: #333;
              font-size: 2em;
              transition: font-size 0.3s;
          }
          
          .form-group {
              margin-bottom: 15px;
          }
          
          label {
              display: block;
              margin-bottom: 5px;
              color: #555;
          }
          
          input,
          textarea {
              width: 100%;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-size: 16px;
              transition: border-color 0.3s;
          }
          
          input:focus,
          textarea:focus {
              border-color: #6e8efb;
              outline: none;
          }
          
          .btn {
              width: 100%;
              padding: 10px;
              background: #6e8efb;
              border: none;
              border-radius: 5px;
              color: #fff;
              font-size: 18px;
              cursor: pointer;
              transition: background 0.3s, transform 0.3s;
          }
          
          .btn:hover {
              background: #a777e3;
              transform: translateY(-2px);
          }
          
          /* Responsive design */
          @media (max-width: 600px) {
              .form-container {
                  padding: 15px 20px;
              }
          
              h2 {
                  font-size: 1.5em;
              }
          
              input,
              textarea {
                  font-size: 14px;
              }
          
              .btn {
                  font-size: 16px;
              }
          }
          

        </style>
        </head>
        <body>
    <div class="background">
    <div class="stars" style="animation-duration: 3s; top: 20%; left: 10%;"></div>
    <div class="stars" style="animation-duration: 4s; top: 25%; left: 20%;"></div>
    <div class="stars" style="animation-duration: 5s; top: 30%; left: 30%;"></div>
    <div class="stars" style="animation-duration: 6s; top: 35%; left: 40%;"></div>
    <div class="stars" style="animation-duration: 7s; top: 40%; left: 50%;"></div>
    <div class="stars" style="animation-duration: 8s; top: 45%; left: 60%;"></div>
    <div class="stars" style="animation-duration: 9s; top: 50%; left: 70%;"></div>
    <div class="stars" style="animation-duration: 10s; top: 55%; left: 80%;"></div>
    <div class="stars" style="animation-duration: 11s; top: 60%; left: 90%;"></div>
    <div class="stars" style="animation-duration: 12s; top: 65%; left: 20%;"></div>
    <div class="stars" style="animation-duration: 13s; top: 70%; left: 30%;"></div>
    <div class="stars" style="animation-duration: 14s; top: 75%; left: 40%;"></div>
    <div class="stars" style="animation-duration: 15s; top: 80%; left: 50%;"></div>
    <div class="stars" style="animation-duration: 16s; top: 85%; left: 60%;"></div>
    <div class="stars" style="animation-duration: 17s; top: 90%; left: 70%;"></div>
    </div>
    <div class="form-container">
        <h2>Send Email</h2>
        <form action="/email/send" method="post">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn">Send</button>
        </form>
    </div>
</body>
        </html>`);
});

server.post("/email/send", (req, res) => {
  console.log(req.body);
  const mailOptions = {
    from: process.env.USER_NAME, // Sender address
    to: req.body.email, // List of recipients
    subject: req.body.subject, // Subject line
    text: req.body.message,
    // html : `
    // <p>${req.body}</p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error occurred:", error.message);
    } else {
      res.send({ email: "Email sent !" });
      console.log("Message ID:", info.messageId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
