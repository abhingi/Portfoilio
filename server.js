// This is server-side code (Node.js/Express)
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Choose any port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up CORS (Cross-Origin Resource Sharing) if your HTML is hosted elsewhere
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your actual domain
//     res.header('Access-Control-Allow-Methods', 'POST');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// Configure your email transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_SERVER_EMAIL@gmail.com', // The email that sends the message
        pass: 'YOUR_EMAIL_APP_PASSWORD' // Use a specific App Password, not your account password
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: `${name} <${email}>`,
        to: 'nabhi2265@gmail.com', // Your receiving email
        subject: `New Contact from Portfolio: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Nodemailer error:', error);
            return res.status(500).send('Error sending message.');
        }
        res.status(200).send('Message successfully sent!');
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
