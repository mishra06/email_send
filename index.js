const PORT = 4000;
const express = require('express');

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const server = express();

server.use(express.urlencoded());
dotenv.config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com', // Replace with your provider's SMTP server
    port: 465, // Port may vary depending on your provider
    secure: true, // Use true for TLS, false for non-TLS (consult your provider)
    auth: {
      user: process.env.USER_NAME, // Replace with your email address
      pass: process.env.USER_PASS // Replace with your email password
    }
});


server.get('/',(req,res)=>{
    res.send(`
    <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Form</title>
        <style>
          /* Basic CSS for styling the form */
          body {
            font-family: Arial, sans-serif;
          }
          form {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          label {
            display: block;
            margin-bottom: 5px;
          }
          input[type="email"],
          input[type="text"],
          textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }
          textarea {
            resize: vertical;
            min-height: 100px;
          }
          button[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
          }
          button[type="submit"]:hover {
            background-color: #45a049;
          }
        </style>
        </head>
        <body>
          <h2>Send Email</h2>
            <form action="/email/send" method="post">
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div>
                        <label for="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div>
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>`)
});

server.post('/email/send',(req,res)=>{
    console.log(req.body);
    const mailOptions = {
        from: process.env.USER_NAME, // Sender address
        to: req.body.email, // List of recipients
        subject:req.body.subject, // Subject line
        message:req.body.message,
        html : `
        <p>${req.body}</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error('Error occurred:', error.message);
        } else {
         res.send({ email: "Email sent !"})
          console.log('Message ID:', info.messageId);
        }
    });
     
})





server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})