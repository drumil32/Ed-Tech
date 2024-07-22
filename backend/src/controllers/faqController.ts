import { Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import FAQModel from "../models/faqModel.js";
import createHttpError from "http-errors";

export const getAllFaqByType = expressAsyncHandler(async (req: Request, res: Response) => {
    const faqType = req.params.faqType;
    const faqDocument = await FAQModel.findOne({ type: faqType }).exec();

    // Check if a document is found
    if (!faqDocument) {
        throw createHttpError(404, `No FAQs found for type: ${faqType}`);
    }

    res.status(200).json({ faqDoc: faqDocument })
    
});