import mongoose, { Schema } from "mongoose";
import { ICounsellingSessionModel } from "../types.js";


const counsellingSessionSchema: Schema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'StudentData',
        required: true
    },
    message: {
        type: String,
        required: true,
        validate: {
            validator: (val: string) => val.length <= 1000,
            message: '{PATH} exceeds the limit of 1000 characters'
        }
    },
    type: {
        type: String,
        enum: ['Counselling', 'NextOpening'],
        required: true
    },
    creationDate: {
        type: String
    },
    creationTime: {
        type: String
    }
});

// Helper function to get the current date in IST
const getCurrentISTDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
};

// Helper function to get the current time in IST
const getCurrentISTTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
};

// Pre-save hook to set the date and time in IST format
counsellingSessionSchema.pre('save', function (next) {
    if (!this.creationDate) { // Only set the date if it's not already set
        this.creationDate = getCurrentISTDate();
    }
    if (!this.creationTime) { // Only set the time if it's not already set
        this.creationTime = getCurrentISTTime();
    }
    next();
});

export const CounsellingSession = mongoose.model<ICounsellingSessionModel>('CounsellingSession', counsellingSessionSchema);