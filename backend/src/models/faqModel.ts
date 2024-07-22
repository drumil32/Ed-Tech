import mongoose, { Schema } from "mongoose";
import { FAQDocument, FAQType } from "../types.js";

const FAQSchema: Schema = new Schema({
    type: {
        type: String,
        enum: Object.values(FAQType),
        required: true
    },
    faq: [
        {
            question: {
                type: String,
                required: true
            },
            startingParagraphs: {
                type: [String],
                default: null
            },
            pointerTitle: {
                type: String,
                default: null
            },
            pointers: {
                type: [String],
                default: null
            },
            endingParagraphs: {
                type: [String],
                default: null
            },
            endingLine: {
                type: String,
                default: null
            }
        }
    ]
});

FAQSchema.pre<FAQDocument>('save', function (next) {
    const faqDocument = this as FAQDocument;

    faqDocument.faq.forEach(faqItem => {
        // Set array fields to null if they are empty
        if (!faqItem.startingParagraphs || faqItem.startingParagraphs.length === 0) {
            faqItem.startingParagraphs = null;
        }
        if (!faqItem.pointers || faqItem.pointers.length === 0) {
            faqItem.pointers = null;
        }
        if (!faqItem.endingParagraphs || faqItem.endingParagraphs.length === 0) {
            faqItem.endingParagraphs = null;
        }
    });

    next();
});

// Creating the model
const FAQModel = mongoose.model<FAQDocument>('FAQ', FAQSchema);

export default FAQModel;