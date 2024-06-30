import { Document } from "mongoose";

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

export interface IStudentModel extends Document {
    name: string;
    phoneNumber: string;
    creationDate?: string; // optional field
    creationTime?: string; // optional field
}

export interface IJwtTokenModel extends Document {
    phoneNumber: string;
    token: string;
}