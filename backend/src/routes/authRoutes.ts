// src/routes/authRoutes.ts
import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { validateName, validatePhoneNumber } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/sign-up',
    validateName,
    validatePhoneNumber,
    signUp
);

router.post('/login',
    validatePhoneNumber,
    login
);

export default router;
