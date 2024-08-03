import { Request, Response } from 'express';
import jwtTokenModel from '../models/jwtTokenModel.js';
import studentModel from '../models/studentModel.js';
import { getRandomNumber } from '../utils/randomNumberGenerator.js';
import createHttpError from 'http-errors';
import expressAsyncHandler from 'express-async-handler';
import { manageUserTokens } from '../utils/token.js';
import axios from 'axios';

export const signUp = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, name } = req.body;

    let isThisNewStudent = true;
    let student = await studentModel.findOne({ phoneNumber });

    if (!student) {
        let avatar = getRandomNumber(1, 5);
        // Create a new student
        student = new studentModel({ phoneNumber, name, avatar });
        await student.save();
        student = student.toObject();
    } else {
        isThisNewStudent = false;
    }

    let token = await manageUserTokens(student.phoneNumber);

    delete student._id;
    delete student.__v;
    res.status(200).json({
        student,
        token,
        message: isThisNewStudent ? 'Signed up successfully!' : 'Account already exists. Logged in successfully!'
    });

});

export const increaseProgress = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req;

    // Find the student by phone number
    const student = await studentModel.findOne({ phoneNumber });

    if (!student) {
        throw createHttpError(404, 'Student not found');
    }

    // Update the progress
    if (student.enrolled) {
        student.enrolled.progress = 2;
    } else {
        student.enrolled = { progress: 2 };
    }

    await student.save();

    res.status(200).json({ message: 'Progress updated successfully', student });
});

export const signIn = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;

    const student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');

    if (student) {
        const token = await manageUserTokens(student.phoneNumber);
        res.status(200).json({
            student,
            token,
            message: 'Logged in successfully!'
        });
    } else {
        throw createHttpError(404, "You don't have an account. Please Signup.");
    }
});

export const auth = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req;

    const student = await studentModel.findOne({ phoneNumber }).select('-_id -__v');

    if (!student) {
        throw createHttpError(404, "You don't have an account."); // though chance of this happening is very less.
    }

    res.status(200).json({
        student
    });

});

export const verifyCaptcha = async (req: Request, res: Response) => {
    const { token } = req.body;
    const secretKey = process.env.GOOGLE_CAPTCHA_SECRET;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verificationUrl);
    if (response.data.success) {
        // reCAPTCHA verified
        res.json({ success: true });
    } else {
        // reCAPTCHA failed
        res.json({ success: false });
    }
};

export const logout = expressAsyncHandler(async (req: Request, res: Response) => {

    const phoneNumber = req.phoneNumber;
    const token = req.token;

    const userTokens = await jwtTokenModel.findOne({ phoneNumber });

    userTokens.token = userTokens.token.filter(t => t !== token);
    await userTokens.save();

    res.status(200).json({ message: 'Logged out successfully!' });

});