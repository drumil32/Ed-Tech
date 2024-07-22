import mongoose, { Schema } from 'mongoose';
import { IStudentModel } from '../types.js';
import moment from 'moment-timezone';

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
    }
}, {
    timestamps: true
});

// Define a virtual for createdAtIST
studentSchema.virtual('createdAtIST').get(function () {
    return moment(this.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});

// Define a virtual for updatedAtIST
studentSchema.virtual('updatedAtIST').get(function () {
    return moment(this.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
});

// Create the model using the schema
const studentModel = mongoose.model<IStudentModel>('studentData', studentSchema);

export default studentModel;
