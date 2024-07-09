import express from 'express';
import { counsellingSessionBooking } from '../controllers/counsellingSessionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateMessage } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/',
    validateMessage,
    authMiddleware,
    counsellingSessionBooking
);

export default router;