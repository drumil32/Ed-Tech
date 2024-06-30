import express from 'express';

import { validateDate, validateName, validatePhoneNumber, validateTime } from '../middleware/validationMiddleware.js';
import { liveClassBooking } from '../controllers/liveClassBookingController.js';

const router = express.Router();

router.post('/',
    validateName,
    validatePhoneNumber,
    validateDate,
    validateTime,
    liveClassBooking
);

export default router;
