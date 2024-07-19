// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import morgan from 'morgan';
import connectDB, { primaryDb } from './config/db.js';
// import routes from './routes/index.js';
import connectRedis, { redisClient } from './config/redis.js';
import expressAsyncHandler from 'express-async-handler';
import { EventType } from './types.js';
import Event from './event.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
// import errorHandler from './controllers/errorHandler';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3001');

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL
}));
app.use(morgan(process.env.ENV!));
console.log(process.env.PRIMARY_MONGO_URL, process.env.PRIMARY_DB, process.env.MONGO_URL);
const StudentSchema = new mongoose.Schema({

});
let studentModel;
connectDB().then(
    () =>
        studentModel = primaryDb.model('studentData', StudentSchema)
);
// connectRedis();

const verifyJwtToken = async (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
}

export const authMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(200).send('ok');
    } else {
        token = token.replace('Bearer ', '');
        try {
            // Verify token
            const decoded = await verifyJwtToken(token);
            req.phoneNumber = decoded.phoneNumber;
            next();
        } catch (error) {
            res.status(200).send('ok');
        }
    }
});

// needs to add authMiddleware here
app.post('/event', expressAsyncHandler(async (req: Request, res: Response) => {
    const { type, phoneNumber } = req.body;
    try {
        if (type !== EventType.FORM_HOME) { // except FROM_HOME every event is only valid if user is logged in
            await redisClient.sAdd(type, [phoneNumber]); // after adding authMiddleware will have req.phoneNumber
        } else {
            const data = await redisClient.sAdd(type, [phoneNumber]);
            res.status(200).json(data); // remove this 
        }
    } catch (error) {
        console.log(error.message);
    }
    res.status(200).send('ok');
}));

app.get('/process-data', expressAsyncHandler(async (req: Request, res: Response) => {
    const memberArray = [];
    try {
        for (const eventType of Object.values(EventType)) {
            const members = await redisClient.sMembers(eventType);
            await (new Event({ type: eventType, members: members, creationDateTime: new Date().toISOString() })).save();
            const data = await redisClient.del(eventType);
            memberArray.push(data);
            memberArray.push(members);
        }
        res.status(200).json(memberArray);
    } catch (error) {
        res.status(500).json({ message: error.message, error }); // should remove this as well but think once before removing it
    }
}));

const toUTCDateTime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hour, minute, second] = timeStr.split(':').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, hour - 5, minute - 30, second));
    return date;
};

// Function to filter events based on type, date range, and time range
export const filterEvents = async (type, d1, d2, t1, t2) => {
    const startDateTime = toUTCDateTime(d1, t1);
    const endDateTime = toUTCDateTime(d2, t2);

    // Query to find events that match the criteria
    const events = await Event.find({
        type: type,
        creationDateTime:
        {
            $gte: startDateTime,
            $lt: endDateTime
        }
    }).exec();

    return events;
};

app.post('/show-data', expressAsyncHandler(async (req: Request, res: Response) => {
    const { type, d1, d2, t1, t2 } = req.body;
    const data = await filterEvents(type, d1, d2, t1, t2);
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].members.length; j++) {
            const studentData = await studentModel.findOne({ phoneNumber: data[i].members[j] });
            data[i].members[j] = studentData;
        }
    }
    res.status(200).json(data);
}));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    // if statusCode is there it means that message will also be created by me
    // if statusCode is not there it means that message is not created by me its something else in this situation we want to send internal server error.
    res.status(err.statusCode ? err.statusCode : 500).json({ error: err.statusCode ? err.message : 'Internal Server Error.Please try again later.' });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => {
        process.exit(1);
    });
});
