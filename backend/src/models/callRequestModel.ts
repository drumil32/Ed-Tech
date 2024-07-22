import mongoose, { Schema } from 'mongoose';
import { ICallRequestModel } from '../types.js';
import moment from 'moment-timezone';

// Define the schema for the model
const callRequestSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^[a-zA-Z\s]*$/.test(v); // Ensure name contains only alphabets and spaces
            },
            message: props => `${props.value} should only contain alphabets and spaces.`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^(\+91)?\d{10}$/.test(v); // Ensure phone number format
            },
            message: props => `${props.value} is not a valid phone number format!`
        }
    },
    message: {
        type: String
    }
}, {
    timestamps: true
});

// Define a virtual for createdAtIST
callRequestSchema.virtual('createdAtIST').get(function () {
    return moment(this.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});

// Define a virtual for updatedAtIST
callRequestSchema.virtual('updatedAtIST').get(function () {
    return moment(this.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});

// Create the model using the schema
const callRequestModel = mongoose.model<ICallRequestModel>('callRequest', callRequestSchema);

export default callRequestModel;
