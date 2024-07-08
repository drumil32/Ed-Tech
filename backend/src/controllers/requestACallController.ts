import { NextFunction, Response, Request } from "express";
import callRequestModel from "../models/callRequestModel.js";
import expressAsyncHandler from "express-async-handler";

export const requestACall = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, phoneNumber, message } = req.body;

    const requestACallData = new callRequestModel({
        name: name.trim(),
        phoneNumber,
        message
    });

    await requestACallData.save();

    res.status(200).json({ message: 'Request is received!', data: { name, phoneNumber, message } });
});