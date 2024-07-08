import { NextFunction, Response, Request } from "express";
import liveClassBookingModel from "../models/liveClassBookingModel.js";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";

export const liveClassBooking = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, phoneNumber, date, time } = req.body;

    const existingDocument = await liveClassBookingModel.findOne({ name: name.trim(), phoneNumber, date, time });

    if (existingDocument) {
        throw createHttpError(409, 'You already booked live class for this slot.');
        // return res.status(409).json({ message: 'You already booked live class for this slot.' });
    }

    // Create a new document using the StudentsData model
    const bookLiveClassData = new liveClassBookingModel({
        name: name.trim(),
        phoneNumber,
        date,
        time
    });
    // Save the document to the database
    await bookLiveClassData.save();

    // Further logic can be added here
    res.status(200).json({ message: 'Session is booked!' });
});