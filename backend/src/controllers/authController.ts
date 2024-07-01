import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';
import studentModel from '../models/studentModel.js';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, name } = req.body;
    try {
        let isThisNewStudent = true;
        let student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');

        if (!student) {
            // Create a new student
            student = new studentModel({ phoneNumber, name });
            await student.save();
            student = student.toObject();
            delete student._id;
            delete student.__v;
        } else {
            isThisNewStudent = false;
        }

        // Generate and send JWT token
        const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

        // Store the JWT token in the database
        await jwtTokenModel.findOneAndUpdate(
            { phoneNumber: student.phoneNumber },
            { token },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            student,
            token,
            message: isThisNewStudent ? 'Signup successfully' : 'Login successfully'
        });
    } catch (err) {
        return next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    try {
        const student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');

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
                student,
                token,
                message: 'Login successfully'
            });
        } else {
            res.status(404).json({ message: "You don't have an account. Please Signup." });
        }
    } catch (err) {
        return next(err);
    }
};