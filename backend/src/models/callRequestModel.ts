import mongoose, { Schema, Document } from 'mongoose';
import { ICallRequestModel } from '../types.js';

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
callRequestSchema.pre('save', function(next) {
    if (!this.creationDate) { // Only set the date if it's not already set
        this.creationDate = getCurrentISTDate();
    }
    if (!this.creationTime) { // Only set the time if it's not already set
        this.creationTime = getCurrentISTTime();
    }
    next();
});

// Create the model using the schema
const callRequestModel = mongoose.model<ICallRequestModel>('callRequest', callRequestSchema);

export default callRequestModel;
