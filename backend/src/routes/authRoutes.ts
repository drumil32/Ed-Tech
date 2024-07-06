// src/routes/authRoutes.ts
import express from 'express';
import { signUp, login, auth } from '../controllers/authController.js';
import { validateName, validatePhoneNumber } from '../middleware/validationMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

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

router.get('/',
    authMiddleware,
    auth
);

export default router;