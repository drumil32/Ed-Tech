import { NextFunction, Response, Request } from "express";
import callRequestModel from "../models/callRequestModel.js";

export const requestACall = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, message } = req.body;

    const requestACallData = new callRequestModel({
        name: name.trim(),
        phoneNumber,
        message
    });

    try {
        await requestACallData.save();
    } catch (err) {
        return next(err);
    }

    res.status(200).json({ message: 'Request is received!', data: { name, phoneNumber, message } });
};