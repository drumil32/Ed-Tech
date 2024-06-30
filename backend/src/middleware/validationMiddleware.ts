import { Request, Response, NextFunction } from 'express';

// Middleware function to validate name
export function validateName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Please Provide a Name' });
    } else if (!name.match(/^[a-zA-Z\s]*$/)) {
        return res.status(400).json({ error: 'Name should only contain alphabets and spaces.' });
    }
    next();
}

// Middleware function to validate phone number
export function validatePhoneNumber(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber } = req.body;
    // Check if the phone number matches the required pattern
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Please Provide a phone number' });
    } else if (!phoneNumber.match(/^(\+91)?\d{10}$/)) {
        return res.status(400).json({ error: 'Invalid phone number format.' });
    }
    next();
}

// Middleware function to validate date
export function validateDate(req: Request, res: Response, next: NextFunction) {
    const { date } = req.body;
    // Check if the date matches the required pattern (DD-MM-YYYY)
    // date is null then we will say it as no preference
    if (date && !date.match(/^\d{2}-\d{2}-\d{4}$/)) {
        return res.status(400).json({ error: 'Invalid date format. Use DD-MM-YYYY.' });
    }
    next();
}

// Middleware function to validate time
export function validateTime(req: Request, res: Response, next: NextFunction) {
    const { time } = req.body;
    // Check if the time matches the required pattern (HH:MM AM/PM)
    // time is null then we will say it as no preference
    if (time && !time.match(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)) {
        return res.status(400).json({ error: 'Invalid time format. Use HH:MM AM/PM.' });
    }
    next();
}