import { Document, Schema } from "mongoose";

export interface IBookLiveClassBookingModel extends Document {
    name: string;
    phoneNumber: string;
    date?: string; // optional field
    time?: string; // optional field
    createdAt: Date;
    updatedAt: Date;
    createdAtIST: string; // Virtual field
    updatedAtIST: string; // Virtual field
}

export interface ICallRequestModel extends Document {
    name: string;
    phoneNumber: string;
    message?: string; // optional field
    createdAt: Date;
    updatedAt: Date;
    createdAtIST: string; // Virtual field
    updatedAtIST: string; // Virtual field
}

// Define the interface for the enrolled field
interface IEnrolled {
    progress: number; // Progress is required and should be a number between 0 and 100
}

// Define the interface for the student model
export interface IStudentModel extends Document {
    name: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    createdAtIST: string; // Virtual field
    updatedAtIST: string; // Virtual field
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
    createdAt: Date;
    updatedAt: Date;
    createdAtIST: string; // Virtual field
    updatedAtIST: string; // Virtual field
}

export enum EventType {
    COURSE_SYLLABUS_VIEW = "COURSE_SYLLABUS_VIEW",
    LOCK_CLICK = "LOCK_BUTTON_CLICK",
    TALK_TO_CLICK = "TALK_TO_CLICK",
    NOT_SURE_CLICK = "NOT_SURE_CLICK",
    REQUEST_A_CALLBACK_CLICK = "REQUEST_A_CALLBACK_CLICK",
}


export interface IEvent extends Document {
    type: EventType;
    count: number;
}

export enum FAQType {
    Program = 'Program',
    Curriculum = 'Curriculum',
    Teaching = 'Teaching',
    EntranceTest = 'Entrance Test',
    Mentors = 'Mentors',
    PlacementSupport = 'Placement Support',
    EntranceFees = 'Entrance Fees'
}

// Interface for the FAQ object within the array
export interface FAQItem {
    question: string;
    startingParagraphs: string[];
    pointerTitle: string;
    pointers: string[];
    endingParagraphs: string[];
    endingLine: string;
}

// Interface for the FAQ schema
export interface FAQDocument extends Document {
    type: FAQType;
    faq: FAQItem[];
}