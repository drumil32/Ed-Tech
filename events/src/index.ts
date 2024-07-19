// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
// import routes from './routes/index.js';
import connectRedis, { redisClient } from './config/redis.js';
import expressAsyncHandler from 'express-async-handler';
import { EventType } from './types.js';
import Event from './event.js';
import createHttpError from 'http-errors';
// import errorHandler from './controllers/errorHandler';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3001');

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL
}));
app.use(morgan(process.env.ENV!));

connectDB();
connectRedis();

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
app.get('/event', expressAsyncHandler(async (req: Request, res: Response) => {
    const { type, phoneNumber } = req.body;
    try {
        if (type !== EventType.FORM_HOME) { // except FROM_HOME every event is only valid if user is logged in
            await redisClient.sAdd(type, [phoneNumber]); // after adding authMiddleware will have req.phoneNumber
        } else {
            await redisClient.sAdd(type, [phoneNumber]);
        }
    } catch (error) {
        console.log(error.message);
    }
    res.status(200).send('ok');
}));

app.get('/process-data', expressAsyncHandler(async (req: Request, res: Response) => {
    for (const eventType of Object.values(EventType)) {
        const members = await redisClient.sMembers(eventType);
        await new Event(eventType, members).save();
        await redisClient.del(eventType);
    }
    res.status(200).send('ok');
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
