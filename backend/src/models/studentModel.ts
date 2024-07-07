import mongoose, { Schema } from 'mongoose';
import { IStudentModel } from '../types.js';

// Define the schema for the enrolled field
const enrolledSchema: Schema = new Schema({
    progress: {
        type: Number,
        required: true, // progress is required
        min: 0,
        max: 100,
        validate: {
            validator: function (v: number) {
                return v >= 0 && v <= 100; // Ensure progress is between 0 and 100
            },
            message: props => `${props.value} should be between 0 and 100.`
        }
    }
}, { _id: false }); // Disable _id for the nested schema

// Define the schema for the model
const studentSchema: Schema = new Schema({
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
        unique: true,
        validate: {
            validator: function (v: string) {
                return /^(\+91)?\d{10}$/.test(v); // Ensure phone number format
            },
            message: props => `${props.value} is not a valid phone number format!`
        }
    },
    avatar: {
        type: Number,
        required: false,
        default: 1
    },
    enrolled: {
        type: enrolledSchema,
        required: false, // Allow enrolled to be null
        default: null
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
studentSchema.pre('save', function (next) {
    if (!this.creationDate) { // Only set the date if it's not already set
        this.creationDate = getCurrentISTDate();
    }
    if (!this.creationTime) { // Only set the time if it's not already set
        this.creationTime = getCurrentISTTime();
    }
    next();
});

// Create the model using the schema
const studentModel = mongoose.model<IStudentModel>('studentData', studentSchema);

export default studentModel;
