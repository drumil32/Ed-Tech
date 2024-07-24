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
        // res.status(200).send('ok'); // use this
        // res.status(401).send('unauthorized'); // remove this
        res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '');
        try {
            // Verify token
            const decoded = await verifyJwtToken(token);
            // console.log(decoded);
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
        // res.status(200).send('ok'); // use this
        // res.status(401).send('unauthorized'); // remove this
        res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '');
        console.log(token);
        try {
            // Verify token
            const decoded = await verifyAdminJwtToken(token);
            next();
        } catch (error) {
            console.log(error);
            res.status(401).send({ message: error.message, error });
        }
    }
});

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
});

// needs to add authMiddleware here
app.post('/event', authMiddleware, expressAsyncHandler(async (req: Request, res: Response) => {
    // console.log(req.body);
    const { type, phoneNumber } = req.body;
    // console.log(typeof phoneNumber)
    // console.log(req.phoneNumber);
    // console.log(typeof req.phoneNumber);
    try {
        if (type != EventType.FORM_HOME) { // except FROM_HOME every event is only valid if user is logged in
            // const data1 = await redisClient.sAdd("abc", ['ghi', 'jkl']);
            // console.log('data1')
            // console.log(data1)
            // const data = await redisClient.sAdd('REQUEST_A_CALLBACK_CLICK', ['phoneNumber', 'phoneNumbe1r']); // after adding authMiddleware will have req.phoneNumber
            // console.log(data)
            // console.log('data')
            await redisClient.sAdd(type, req.phoneNumber);
            // console.log('data')
            // console.log(data)
            // res.status(200).send(data); // remove this
        } else {
            await redisClient.sAdd(type, [phoneNumber]);
            // res.status(200).json(data); // remove this 
        }
        res.status(200).send('ok'); // use this
    } catch (error) {
        console.log(error.message);
        console.log(error);
        res.status(500).json({ message: error.message, error }); // remove this
    }
}));

app.get('/process-data', adminAuthMiddleware, expressAsyncHandler(async (req: Request, res: Response) => {
    // const memberArray = [];
    try {
        for (const eventType of Object.values(EventType)) {
            const members = await redisClient.sMembers(eventType);
            await (new Event({ type: eventType, members: members, creationDateTime: new Date().toISOString() })).save();

            await redisClient.del(eventType);
            // memberArray.push(data);
            // memberArray.push(members);
        }
        // res.status(200).json(memberArray);
        res.status(200).send('ok');
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
    const { password, type, startingDate, endingDate, startingTime, endingTime } = req.body;
    if (password == process.env.ENROLL_PASSWORD) {
        throw createHttpError(403, "Invalid Password.");
    }
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
        // console.log(processedData);
        res.status(200).json(processedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message, error });
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
