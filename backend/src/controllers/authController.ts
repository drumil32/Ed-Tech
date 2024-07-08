import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtTokenModel from '../models/jwtTokenModel.js';
import studentModel from '../models/studentModel.js';
import { getRandomNumber } from '../utils/randomNumberGenerator.js';
import createHttpError from 'http-errors';
import expressAsyncHandler from 'express-async-handler';
import { manageUserTokens, tokenGenerator } from '../utils/token.js';

export const signUp = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, name } = req.body;

    let isThisNewStudent = true;
    let student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');


    if (!student) {
        let avatar = getRandomNumber(1, 5);
        // Create a new student
        student = new studentModel({ phoneNumber, name, avatar });
        await student.save();
        student = student.toObject();
        delete student._id;
        delete student.__v;
    } else {
        isThisNewStudent = false;
    }

    let token = null;

    if (isThisNewStudent) {
        token = tokenGenerator({ phoneNumber: student.phoneNumber });
        const userTokens = new jwtTokenModel({
            phoneNumber: student.phoneNumber,
            token: [token]
        });
        await userTokens.save();
    } else {
        token = await manageUserTokens(student.phoneNumber);
    }

    res.status(200).json({
        student,
        token,
        message: isThisNewStudent ? 'Signup Successfully.' : 'Login Successfully.'
    });

});

export const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;

    const student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');

    if (student) {
        const token = await manageUserTokens(student.phoneNumber);
        res.status(200).json({
            student,
            token,
            message: 'Login Successfully.'
        });
    } else {
        throw createHttpError(404, "You don't have an account. Please Signup.");
    }
});

export const auth = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req;
    console.log('inside auth')

    const student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');

    if (!student) {
        throw createHttpError(404, "You don't have an account."); // though chance of this happening is very less.
    }

    res.status(200).json({
        student
    });

});

export const logout = expressAsyncHandler(async (req: Request, res: Response) => {

    const phoneNumber = req.phoneNumber;
    const token = req.token;

    const userTokens = await jwtTokenModel.findOne({ phoneNumber });

    userTokens.token = userTokens.token.filter(t => t !== token);
    await userTokens.save();

    res.status(200).json({ message: 'Logout Successfully.' });

});