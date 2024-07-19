import mongoose, { Schema, Document } from 'mongoose';
import { EventType } from './types'; // Adjust the import path

interface IEvent extends Document {
    type: EventType;
    members: string[];
    creationDate: string;
    creationTime: string;
}

const eventSchema: Schema<IEvent> = new Schema({
    type: {
        type: String,
        enum: Object.values(EventType),
        required: true
    },
    members: {
        type: [String],
        required: true
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
eventSchema.pre('save', function (next) {
    if (!this.creationDate) { // Only set the date if it's not already set
        this.creationDate = getCurrentISTDate();
    }
    if (!this.creationTime) { // Only set the time if it's not already set
        this.creationTime = getCurrentISTTime();
    }
    next();
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
