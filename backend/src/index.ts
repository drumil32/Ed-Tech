// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
// import morgan from 'morgan';
import connectDB from './config/db.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

app.use(express.json());
const allowedOrigins: string[] = [];

if (process.env.FRONTEND_BASE_URL) {
    allowedOrigins.push(process.env.FRONTEND_BASE_URL);
}

if (process.env.ANOTHER_FRONTEND_URL) {
    allowedOrigins.push(process.env.ANOTHER_FRONTEND_URL);
}

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Other options can be added here
};

app.use(cors(corsOptions));
// app.use(morgan(process.env.ENV!));

connectDB();

app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (!err.statusCode) {
        console.error(err);
    }
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
