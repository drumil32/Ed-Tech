import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }
    const tokenString = token.replace('Bearer ', '');
    try {
        // Verify token
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET) as { [key: string]: any };
        const user = await jwtTokenModel.findOne({ phoneNumber: decoded.phoneNumber });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (!user.token.includes(tokenString)) {
            return res.status(401).json({ error: 'Token is not valid' });
        }
        req.body.phoneNumber = decoded.phoneNumber;
        // If token is valid, proceed to next middleware or route handler
        next();
    } catch (error) {
        // If token is expired or invalid
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token is expired' });
        }
        return res.status(401).json({ error: 'Token is not valid' });
    }
}