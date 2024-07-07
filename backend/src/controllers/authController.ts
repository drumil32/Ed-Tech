import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';
import studentModel from '../models/studentModel.js';
import { getRandomNumber } from '../utils/randomNumberGenerator.js';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, name } = req.body;
    try {
        let isThisNewStudent = true;
        let student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');
        let avatar = getRandomNumber(1, 5);

        if (!student) {
            // Create a new student
            student = new studentModel({ phoneNumber, name, avatar });
            await student.save();
            student = student.toObject();
            delete student._id;
            delete student.__v;
        } else {
            isThisNewStudent = false;
        }

        // Generate and send JWT token
        const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

        if (isThisNewStudent) {
            const userTokens = new jwtTokenModel({
                phoneNumber: student.phoneNumber,
                token: [token]
            });
            await userTokens.save();
        } else {
            let userTokens = await jwtTokenModel.findOne({ phoneNumber: student.phoneNumber });
            if (userTokens) {
                // If user already exists, check the token array length
                if (userTokens.token.length == 3) {
                    // Return error if the token array length exceeds the limit
                    return res.status(403).json({ message: 'Login limit exceeded. Please log out from other devices.' });
                }
                // Generate JWT token
                const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });
                // Add the new token to the array
                userTokens.token.push(token);
                await userTokens.save();
            } else {
                // Generate JWT token
                const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

                // If user does not exist, create a new entry with the token array
                userTokens = new jwtTokenModel({
                    phoneNumber: student.phoneNumber,
                    token: [token]
                });
                await userTokens.save();
            }
        }

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
            let userTokens = await jwtTokenModel.findOne({ phoneNumber: student.phoneNumber });

            // Generate JWT token
            const token = jwt.sign({ phoneNumber: student.phoneNumber }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRATION_TIME}` });

            if (userTokens) {
                // If user already exists, check the token array length
                if (userTokens.token.length == 3) {
                    // Return error if the token array length exceeds the limit
                    return res.status(403).json({ message: 'Login limit exceeded. Please log out from other devices.' });
                }
                // Add the new token to the array
                userTokens.token.push(token);
                await userTokens.save();
            } else {
                // If user does not exist, create a new entry with the token array
                userTokens = new jwtTokenModel({
                    phoneNumber: student.phoneNumber,
                    token: [token]
                });
                await userTokens.save();
            }
            res.status(200).json({
                student,
                token,
                message: 'Login successfully'
            });
        } else {
            return res.status(404).json({ message: "You don't have an account. Please Signup." });
        }
    } catch (err) {
        return next(err);
    }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req;
    try {
        const student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');
        return res.status(200).json({
            student
        });
    } catch (err) {
        return next(err);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phoneNumber = req.phoneNumber;
        const token = req.token;

        const userTokens = await jwtTokenModel.findOne({ phoneNumber });

        userTokens.token = userTokens.token.filter(t => t !== token);
        await userTokens.save();

        res.status(200).json({ message: 'Logout successful' });

    } catch (err) {
        return next(err);
    }
};