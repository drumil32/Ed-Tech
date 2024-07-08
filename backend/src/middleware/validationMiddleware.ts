import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

// Middleware function to validate name
export const validateName = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
        throw createHttpError(400, 'Please Provide a Name');
    } else if (!name.match(/^[a-zA-Z\s]*$/)) {
        throw createHttpError(400, 'Name should only contain alphabets and spaces.');
    }
    next();
}

// Middleware function to validate phone number
export const validatePhoneNumber = (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    // Check if the phone number matches the required pattern
    if (!phoneNumber) {
        throw createHttpError(400, 'Please Provide a phone number');
    } else if (!phoneNumber.match(/^(\+91)?\d{10}$/)) {
        throw createHttpError(400, 'Invalid phone number format.')
    }
    next();
}

// Middleware function to validate date
export const validateDate = (req: Request, res: Response, next: NextFunction) => {
    const { date } = req.body;
    // Check if the date matches the required pattern (DD-MM-YYYY)
    // date is null then we will say it as no preference
    if (date && !date.match(/^\d{2}-\d{2}-\d{4}$/)) {
        throw createHttpError(400, 'Invalid date format. Use DD-MM-YYYY.');
    }
    next();
}

// Middleware function to validate time
export const validateTime = (req: Request, res: Response, next: NextFunction) => {
    const { time } = req.body;
    // Check if the time matches the required pattern (HH:MM AM/PM)
    // time is null then we will say it as no preference
    if (time && !time.match(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)) {
        throw createHttpError(400, 'Invalid time format. Use HH:MM AM/PM.');
    }
    next();
}