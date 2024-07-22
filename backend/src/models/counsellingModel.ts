import mongoose, { Schema } from "mongoose";
import { ICounsellingSessionModel } from "../types.js";
import moment from "moment-timezone";


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
    }
}, {
    timestamps: true
});

// Define a virtual for createdAtIST
counsellingSessionSchema.virtual('createdAtIST').get(function () {
    return moment(this.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});

// Define a virtual for updatedAtIST
counsellingSessionSchema.virtual('updatedAtIST').get(function () {
    return moment(this.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});

export const CounsellingSession = mongoose.model<ICounsellingSessionModel>('CounsellingSession', counsellingSessionSchema);