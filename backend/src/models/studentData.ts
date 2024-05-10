import mongoose, { Schema, Document } from 'mongoose';

// Interface representing the document in MongoDB
interface IStudentsData extends Document {
    name: string;
    phoneNumber: string;
    type: string;
}

// Define the schema for the model
const studentsDataSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Book A Live Session', 'Request A Call'] // Enum for allowed values
    }
});

// Create the model using the schema
const StudentsData = mongoose.model<IStudentsData>('StudentsData', studentsDataSchema);

export default StudentsData;
