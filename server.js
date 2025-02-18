const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files Properly
app.use(express.static(path.join(__dirname, 'assets')));

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tsc.trade.notify@gmail.com',
        pass: 'dlflavrvdjjhfvnc'
    }
});

// Test Route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Email Sending Endpoint
app.post('/send-email', (req, res) => {
    console.log('Received email request:', req.body);

    const mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).json({ success: false, error: error.message });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
});

// Handle All Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
