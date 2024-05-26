import mongoose, { Schema } from 'mongoose';
// Define the schema for the model
const bookLiveClassSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]*$/.test(v); // Ensure name contains only alphabets and spaces
            },
            message: props => `${props.value} should only contain alphabets and spaces.`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(\+91)?\d{10}$/.test(v); // Ensure phone number format
            },
            message: props => `${props.value} is not a valid phone number format!`
        }
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{2}-\d{2}-\d{4}/.test(v); // Ensure date format is day-month-year
            },
            message: props => `${props.value} is not a valid date format!`
        }
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/.test(v); // Ensure time format is HH:MM AM/PM
            },
            message: props => `${props.value} is not a valid time format!`
        }
    }
});
// Create the model using the schema
const BookLiveClassData = mongoose.model('BookLiveClassData', bookLiveClassSchema);
export default BookLiveClassData;
//# sourceMappingURL=bookLiveClassData.js.map