import mongoose, { Schema, Document } from 'mongoose';
import { IBookLiveClassData } from '../types.js';

// Define the schema for the model
const requestACallSchema: Schema = new Schema({
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
});

// Create the model using the schema
const RequestACallData = mongoose.model<IBookLiveClassData>('requestACallData', requestACallSchema);

export default RequestACallData;
