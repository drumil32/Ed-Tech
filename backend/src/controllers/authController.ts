import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';
import studentModel from '../models/studentModel.js';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, name } = req.body;
    try {
        const existingStudent = await studentModel.findOne({ phoneNumber });

        if (!existingStudent) {
            // Create a new student
            const newStudent = new studentModel({ phoneNumber, name });
            await newStudent.save();
        }

        // Generate and send JWT token
        const token = jwt.sign({ phoneNumber: existingStudent?.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

        // Store the JWT token in the database
        await jwtTokenModel.findOneAndUpdate(
            { phoneNumber: existingStudent?.phoneNumber },
            { token },
            { upsert: true, new: true }
        );

        return res.status(200).json({ 
            phoneNumber: existingStudent?.phoneNumber,
            name: existingStudent?.name,
            token
        });
    } catch (err) {
        return next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    try {
        const student = await studentModel.findOne({ phoneNumber });

        if (student) {
            // Generate JWT token
            const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

            // Store the JWT token in the database
            await jwtTokenModel.findOneAndUpdate(
                { phoneNumber: student.phoneNumber },
                { token },
                { upsert: true, new: true }
            );

            res.status(200).json({
                phoneNumber: student.phoneNumber,
                name: student.name,
                token
            });
        } else {
            res.status(404).json({ message: "You don't have an account. Please Signup." });
        }
    } catch (err) {
        return next(err);
    }
};
