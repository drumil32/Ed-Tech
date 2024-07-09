import expressAsyncHandler from "express-async-handler";
import { Response, Request } from "express";
import studentModel from "../models/studentModel.js";
import { CounsellingSession } from "../models/counsellingModel.js";
import { sendMailToSystem } from "../utils/mail.js";

export const counsellingSessionBooking = expressAsyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req;
    const { message, type } = req.body;

    const student = await studentModel.findOne({ phoneNumber });

    // const counsellingSession
    await new CounsellingSession({
        student: student._id,
        message,
        type
    }).save();

    const subject = type == 'Counselling' ? 'Counselling Session Booking' : 'Next Batch Information';
    const body = `
        <p><b>Student Name : </b> ${student.name}.</p>
        <p><b>Phone Number : </b> ${student.phoneNumber}.</p>
        <p><b>Message : </b> ${message}</p>
    `;

    await sendMailToSystem(subject, body);

    res.status(200).json({ message: ' We will contact you soon! 🙂' });
});