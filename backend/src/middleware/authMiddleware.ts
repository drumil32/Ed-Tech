import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';
import createHttpError from 'http-errors';
import expressAsyncHandler from 'express-async-handler';
import { verifyJwtToken } from '../utils/token.js';

export const authMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const tokenString = token.replace('Bearer ', '');

    // Verify token
    const decoded = await verifyJwtToken(token);

    req.phoneNumber = decoded.phoneNumber;
    req.token = tokenString;
    // If token is valid, proceed to next middleware or route handler
    next();
});