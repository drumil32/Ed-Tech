import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import connectDB from './config/db.js';
import callRequestModel from './models/callRequest.js';
import liveClassBookingModel from './models/liveClassBooking.js';
import studentModel from './models/student.js';
import jwtTokenModel from './models/jwtToken.js';
import { validateDate, validateName, validatePhoneNumber, validateTime } from './middlewares.js';

dotenv.config(); // Load environment variables from .env file

// Check if all required environment variables are present
const requiredEnvVariables = [
    'PORT',
    'ENV',
    'MONGO_URL',
    'FRONTEND_BASE_URL',
    'JWT_SECRET',
    'JWT_EXPIRATION_TIME'
];

const missingEnvVariables = requiredEnvVariables.filter(variable => !process.env[variable]);

if (missingEnvVariables.length > 0) {
    throw new Error(`Required environment variables are missing: ${missingEnvVariables.join(', ')}`);
}

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000'); // Use port from environment variables or default to 3000

app.use(express.json()); // Enable JSON parsing middleware

// Enable CORS with specific origin
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL
}));

// Set up morgan middleware for logging
app.use(morgan(process.env.ENV!));

connectDB();

// POST endpoint to handle name, phone number, type, date, and time
app.post('/book-live-class', validateName, validatePhoneNumber, validateDate, validateTime, async (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, date, time } = req.body;

    try {
        const existingDocument = await liveClassBookingModel.findOne({ name: name.trim(), phoneNumber, date, time });

        if (existingDocument) {
            return res.status(409).json({ message: 'You already booked live class for this slot.' });
        }

        // Create a new document using the StudentsData model
        const bookLiveClassData = new liveClassBookingModel({
            name: name.trim(),
            phoneNumber,
            date,
            time
        });
        // Save the document to the database
        await bookLiveClassData.save();
    } catch (err) {
        return next(err);
    }

    // Further logic can be added here
    return res.status(200).json({ message: 'Session is booked!', data: { name, phoneNumber, date, time } });
});

app.post('/request-a-callback', validateName, validatePhoneNumber, async (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, message } = req.body;
    const requestACallData = new callRequestModel({
        name: name.trim(),
        phoneNumber,
        message
    });
    try {
        await requestACallData.save();
    } catch (err) {
        return next(err);
    }
    res.status(200).json({ message: 'Request is received!', data: { name, phoneNumber, message } });
});

app.post('/sign-up', validateName, validatePhoneNumber, async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, name } = req.body;
    try {
        const existingStudent = await studentModel.findOne({ phoneNumber });

        if (!existingStudent) {
            // Create a new student
            const newStudent = new studentModel({ phoneNumber, name });
            await newStudent.save();
        }
        // generate and send JWT token
        const token = jwt.sign({ phoneNumber: existingStudent.phoneNumber }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

        // Store the JWT token in the database
        await jwtTokenModel.findOneAndUpdate(
            { phoneNumber: existingStudent.phoneNumber },
            { token },
            { upsert: true, new: true }
        );

        return res.status(200).json({ 
            phoneNumber: existingStudent.phoneNumber,
            name: existingStudent.name,
            token
        });
    } catch (err) {
        return next(err);
    }
});

app.post('/login', validatePhoneNumber, async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    try {
        const student = await studentModel.findOne({ phoneNumber });

        if (student) {
            // Generate JWT token
            const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

            // Store the JWT token in the database
            await jwtTokenModel.findOneAndUpdate(
                { phoneNumber: student.phoneNumber },
                { token },
                { upsert: true, new: true }
            );

            res.status(200).json({
                phoneNumber: student.phoneNumber,
                name: student.name,
                token
            });
        } else {
            res.status(404).json({ message: "You don't have an account. Please Signup." });
        }
    } catch (err) {
        return next(err);
    }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Server is down. Please try again later.');
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