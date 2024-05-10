import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import StudentsData from './models/studentData.js';

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
const PORT: number = parseInt(process.env.PORT || '3000'); // Use port from environment variables or default to 3000

app.use(express.json()); // Enable JSON parsing middleware

// Enable CORS with specific origin
app.use(cors({
    // origin: process.env.FRONTEND_BASE_URI
    origin: '*'
}));

// Set up morgan middleware for logging
app.use(morgan(process.env.ENV!));

connectDB();

// POST endpoint to handle name, phone number, and type
app.post('/', validateName, validatePhoneNumber, validateType, async (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, type } = req.body;

    // Create a new document using the StudentsData model
    const studentData = new StudentsData({
        name: name.trim(),
        phoneNumber,
        type
    });

    try {
        // Save the document to the database
        await studentData.save();
    } catch (err) {
        next(err);
    }

    // Further logic can be added here
    res.status(200).json({ message: 'Data received successfully.', name, phoneNumber, type });
});

// Middleware function to validate name
function validateName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (!name.match(/^[a-zA-Z\s]*$/)) {
        return res.status(400).json({ error: 'Name should only contain alphabets and spaces.' });
    }
    next();
}

// Middleware function to validate phone number
function validatePhoneNumber(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber } = req.body;
    // Check if the phone number matches the required pattern
    if (!phoneNumber.match(/^(\+91)?\d{10}$/) && !phoneNumber.match(/^\d{10}$/)) {
        return res.status(400).json({ error: 'Invalid phone number format.' });
    }
    next();
}
// Middleware function to validate type
function validateType(req: Request, res: Response, next: NextFunction) {
    const { type } = req.body;
    // Check if the type is one of the allowed values
    if (!['Book A Live Session', 'Request A Call'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type provided.' });
    }
    next();
}


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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