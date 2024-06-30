import { NextFunction, Response, Request } from "express";
import liveClassBookingModel from "../models/liveClassBookingModel.js";

export const liveClassBooking = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phoneNumber, date, time } = req.body;

    try {
        const existingDocument = await liveClassBookingModel.findOne({ name: name.trim(), phoneNumber, date, time });

        if (existingDocument) {
            return res.status(409).json({ message: 'You already booked live class for this slot.' });
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
    } catch (err) {
        console.log('we are here')
        return next(err);
    }

    // Further logic can be added here
    return res.status(200).json({ message: 'Session is booked!', data: { name, phoneNumber, date, time } });
};