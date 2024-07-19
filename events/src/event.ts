import mongoose, { Schema, Document } from 'mongoose';
import { EventType } from './types'; // Adjust the import path

interface IEvent extends Document {
    type: EventType;
    members: string[];
    creationDateTime: Date;
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
    creationDateTime: {
        type: Date,
        required: true
    }
});

eventSchema.pre('save', function (next) {
    if (!this.creationDateTime) {
        this.creationDateTime = new Date();
    }
    next();
});

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
