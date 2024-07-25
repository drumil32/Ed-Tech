import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import morgan from 'morgan';
import connectDB, { primaryDb } from './config/db.js';
import connectRedis, { redisClient } from './config/redis.js';
import expressAsyncHandler from 'express-async-handler';
import { EventType } from './types.js';
import Event from './event.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3002');

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL
}));

app.use(morgan(process.env.ENV!));

const StudentSchema = new mongoose.Schema({

});
let studentModel;
connectDB().then(
    () =>
        studentModel = primaryDb.model('studentData', StudentSchema)
);
connectRedis();

const verifyJwtToken = async (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
}

const verifyAdminJwtToken = async (token: string) => {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET) as { [key: string]: any };
}

export const authMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '');
        try {
            const decoded = await verifyJwtToken(token);
            req.phoneNumber = decoded.phoneNumber;
            next();
        } catch (error) {
            res.status(200).send('ok');
        }
    }
});

export const adminAuthMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).send({ message: 'Unauthorize' });
    } else {
        token = token.replace('Bearer ', '');
        try {
            await verifyAdminJwtToken(token);
            next();
        } catch (error) {
            res.status(401).send({ message: 'Unauthorize' });
        }
    }
});

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
});
app.post('/event', expressAsyncHandler(async (req: Request, res: Response) => {
    const { type, phoneNumber } = req.body;
    if (type != EventType.FORM_HOME) {
        await redisClient.sAdd(type, [phoneNumber]);
    }
    res.sendStatus(200);
}));

// needs to add authMiddleware here
app.post('/event-auth', authMiddleware, expressAsyncHandler(async (req: Request, res: Response) => {
    const { type } = req.body;
    try {
        await redisClient.sAdd(type, req.phoneNumber);
    } catch (error) {
    }
    res.sendStatus(200);
}));

app.get('/process-data', adminAuthMiddleware, expressAsyncHandler(async (req: Request, res: Response) => {
    // const memberArray = [];
    try {
        for (const eventType of Object.values(EventType)) {
            const members = await redisClient.sMembers(eventType);
            await (new Event({ type: eventType, members: members, creationDateTime: new Date().toISOString() })).save();
            await redisClient.del(eventType);
        }
        res.status(200).send('ok');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

const toUTCDateTime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hour, minute, second] = timeStr.split(':').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, hour - 5, minute - 30, second));
    return date;
};

// Function to filter events based on type, date range, and time range
export const filterEvents = async (type: EventType, startingDate: string, endingDate: string, startingTime: string, endingTime: string) => {
    const startDateTime = toUTCDateTime(startingDate, startingTime);
    const endDateTime = toUTCDateTime(endingDate, endingTime);

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

app.post('/show-data', adminAuthMiddleware, expressAsyncHandler(async (req: Request, res: Response) => {
    const { type, startingDate, endingDate, startingTime, endingTime } = req.body;

    try {
        const data = await filterEvents(type, startingDate, endingDate, startingTime, endingTime);
        const processedData = [];
        for (let i = 0; i < data.length; i++) {
            processedData.push({
                type: data[i].type,
                members: []
            });
            for (let j = 0; j < data[i].members.length; j++) {
                const studentData = await studentModel.findOne({ phoneNumber: data[i].members[j] });
                processedData[i].members.push(studentData);
            }
        }
        res.status(200).json(processedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
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
