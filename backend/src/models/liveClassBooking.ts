import mongoose, { Schema, Document } from 'mongoose';
import { IBookLiveClassData } from '../types.js';

// Define the schema for the model
const liveClassBookingSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^[a-zA-Z\s]*$/.test(v); // Ensure name contains only alphabets and spaces
            },
            message: props => `${props.value} should only contain alphabets and spaces.`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string) {
                return /^(\+91)?\d{10}$/.test(v); // Ensure phone number format
            },
            message: props => `${props.value} is not a valid phone number format!`
        }
    },
    date: {
        type: String,
        // required: true,
        validate: {
            validator: function(v: string) {
                return /\d{2}-\d{2}-\d{4}/.test(v); // Ensure date format is day-month-year
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
    time: {
        type: String,
        // required: true,
        validate: {
            validator: function(v: string) {
                return /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(v); // Ensure time format is HH:MM AM/PM
            },
            message: props => `${props.value} is not a valid time format!`
        }
    }
});

// Create the model using the schema
const liveClassBookingModel = mongoose.model<IBookLiveClassData>('liveClassBooking', liveClassBookingSchema);

export default liveClassBookingModel;
