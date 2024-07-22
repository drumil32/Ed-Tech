import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { decodeJwtToken, deleteExpiredToken, verifyAdminJwtToken, verifyJwtToken } from '../utils/token.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';

export const authMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        throw createHttpError(401, 'Please Login.');
    }

    const tokenString = token.replace('Bearer ', '');

    let decoded = null;

    try {
        // Verify token
        decoded = await verifyJwtToken(tokenString);
        
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {
            const decoded = decodeJwtToken(tokenString);
            await deleteExpiredToken(decoded.phoneNumber);
        }
        throw createHttpError(401, 'Please Login.');
    }

    const userTokens = await jwtTokenModel.findOne({ phoneNumber: decoded.phoneNumber });

    if (!userTokens) {
        throw createHttpError(401, 'Please Login.');
    }

    if (!userTokens.token.includes(tokenString)) {
        throw createHttpError(401, 'Please Login.');
    }

    req.phoneNumber = decoded.phoneNumber;
    req.token = tokenString;
    // If token is valid, proceed to next middleware or route handler
    next();
});

export const adminAuthMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
        // res.status(200).send('ok'); // use this
        // res.status(401).send('unauthorized'); // remove this
        res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '');
        try {
            // Verify token
            const decoded = await verifyAdminJwtToken(token);
            next();
        } catch (error) {
            res.status(200).send('ok');
        }
    }
});