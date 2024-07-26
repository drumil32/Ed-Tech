import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const TypeModel = mongoose.model('Type', typeSchema);

export default TypeModel;
