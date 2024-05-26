import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import BookLiveClassData from './models/bookLiveClassData.js';
import RequestACallData from './models/requestACallData.js';
dotenv.config(); // Load environment variables from .env file
// Check if all required environment variables are present
const requiredEnvVariables = [
    'PORT',
    'ENV',
    'MONGO_URL'
];
const missingEnvVariables = requiredEnvVariables.filter(variable => !process.env[variable]);
if (missingEnvVariables.length > 0) {
    throw new Error(`Required environment variables are missing: ${missingEnvVariables.join(', ')}`);
}
const app = express();
const PORT = parseInt(process.env.PORT || '3000'); // Use port from environment variables or default to 3000
app.use(express.json()); // Enable JSON parsing middleware
// Enable CORS with specific origin
app.use(cors({
    // origin: process.env.FRONTEND_BASE_URI
    origin: '*'
}));
// Set up morgan middleware for logging
app.use(morgan(process.env.ENV));
connectDB();
// POST endpoint to handle name, phone number, type, date, and time
app.post('/book-live-class', validateName, validatePhoneNumber, validateDate, validateTime, async (req, res, next) => {
    const { name, phoneNumber, date, time } = req.body;
    try {
        const existingDocument = await BookLiveClassData.findOne({ name: name.trim(), phoneNumber, date, time });
        if (existingDocument) {
            return res.status(409).json({ message: 'You already booked live class for this slot.' });
        }
        // Create a new document using the StudentsData model
        const bookLiveClassData = new BookLiveClassData({
            name: name.trim(),
            phoneNumber,
            date,
            time
        });
        // Save the document to the database
        await bookLiveClassData.save();
    }
    catch (err) {
        next(err);
    }
    // Further logic can be added here
    res.status(200).json({ message: 'Session is booked!', data: { name, phoneNumber, date, time } });
});
app.post('/request-a-callback', validateName, validatePhoneNumber, async (req, res, next) => {
    const { name, phoneNumber, message } = req.body;
    const requestACallData = new RequestACallData({
        name: name.trim(),
        phoneNumber,
        message
    });
    try {
        await requestACallData.save();
    }
    catch (err) {
        next(err);
    }
    res.status(200).json({ message: 'Request is received!', data: { name, phoneNumber, message } });
});
// Middleware function to validate name
function validateName(req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Please Provide a Name' });
    }
    else if (!name.match(/^[a-zA-Z\s]*$/)) {
        return res.status(400).json({ error: 'Name should only contain alphabets and spaces.' });
    }
    next();
}
// Middleware function to validate phone number
function validatePhoneNumber(req, res, next) {
    const { phoneNumber } = req.body;
    // Check if the phone number matches the required pattern
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Please Provide a phone number' });
    }
    else if (!phoneNumber.match(/^(\+91)?\d{10}$/)) {
        return res.status(400).json({ error: 'Invalid phone number format.' });
    }
    next();
}
// Middleware function to validate date
function validateDate(req, res, next) {
    const { date } = req.body;
    // Check if the date matches the required pattern (DD-MM-YYYY)
    if (!date) {
        return res.status(400).json({ error: 'Please Provide a Date' });
    }
    else if (!date.match(/^\d{2}-\d{2}-\d{4}$/)) {
        return res.status(400).json({ error: 'Invalid date format. Use DD-MM-YYYY.' });
    }
    next();
}
// Middleware function to validate time
function validateTime(req, res, next) {
    const { time } = req.body;
    // Check if the time matches the required pattern (HH:MM AM/PM)
    if (!time) {
        return res.status(400).json({ error: 'Please Provide a Time' });
    }
    else if (!time.match(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)) {
        return res.status(400).json({ error: 'Invalid time format. Use HH:MM AM/PM.' });
    }
    next();
}
// Error handling middleware
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
// Start the server
const server = app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Gracefully close the server and then exit
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map