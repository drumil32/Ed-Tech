import mongoose, { Schema, Document, Model } from 'mongoose';
import { EventType, IEvent } from '../types.js';

const EVentSchema: Schema = new Schema({
    type: {
        type: String,
        enum: EventType,
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});

const EventModel: Model<IEvent> = mongoose.model<IEvent>('EVent', EVentSchema);

export default EventModel;