import { NextFunction, Response, Request } from "express";
import studentModel from "../models/studentModel.js";

export const enrollStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    try {
        const student = await studentModel.findOneAndUpdate(
            { phoneNumber },
            { $set: { enrolled: { progress: 0 } } },
            { new: true, runValidators: true }
        ).select('-_id -__v');

        if (!student) {
            return res.status(404).json({ message: "Student with the provided mobile number does not exist." });
        }

        res.status(200).json({ message: "Student enrolled successfully.", student });
    } catch (err) {
        return next(err);
    }
}