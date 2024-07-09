import { Document, Schema } from "mongoose";

export interface IBookLiveClassBookingModel extends Document {
    name: string;
    phoneNumber: string;
    date?: string; // optional field
    time?: string; // optional field
    creationDate?: string; // optional field
    creationTime?: string; // optional field
}

export interface ICallRequestModel extends Document {
    name: string;
    phoneNumber: string;
    message?: string; // optional field
    creationDate?: string; // optional field
    creationTime?: string; // optional field
}

// Define the interface for the enrolled field
interface IEnrolled {
    progress: number; // Progress is required and should be a number between 0 and 100
}

// Define the interface for the student model
export interface IStudentModel extends Document {
    name: string;
    phoneNumber: string;
    creationDate: string;
    creationTime: string;
    enrolled?: IEnrolled | null; // Enrolled can be an object following the IEnrolled interface or null
}

export interface IJwtTokenModel extends Document {
    phoneNumber: string;
    token: string[];
}

export interface ICounsellingSessionModel extends Document {
    student: Schema.Types.ObjectId;
    message: string;
    type: 'Counselling' | 'NextOpening';
    creationDate: string;
    creationTime: string;
}