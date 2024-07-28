import { Response, Request } from "express";
import studentModel from "../models/studentModel.js";
import createHttpError from "http-errors";
import expressAsyncHandler from "express-async-handler";

export const enrollStudent = expressAsyncHandler(async (req: Request, res: Response) => {
    const { password, phoneNumber } = req.body;

    if (password == process.env.ENROLL_PASSWORD) {
        throw createHttpError(403, "Invalid enrollment password.");
    }

    const student = await studentModel.findOneAndUpdate(
        { phoneNumber },
        { $set: { isEnrolled: true } },
        { new: true, runValidators: true }
    ).select('-_id -__v');

    if (!student) {
        throw createHttpError(404, 'Student with the provided mobile number does not exist.');
    }

    res.status(200).json({ message: "Student enrolled successfully.", student });

});