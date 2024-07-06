import mongoose, { Schema } from 'mongoose';
import { IJwtTokenModel } from '../types.js';

const jwtTokenSchema: Schema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: [String],
        required: true,
        validate: {
            validator: (val: string[]) => val.length <= 3,
            message: '{PATH} exceeds the limit of 3'
        }
    }
});

const jwtTokenModel = mongoose.model<IJwtTokenModel>('jwtToken', jwtTokenSchema);

export default jwtTokenModel;
