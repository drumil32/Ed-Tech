// src/routes/authRoutes.ts
import express from 'express';
import { signUp, signIn, auth, logout, increaseProgress } from '../controllers/authController.js';
import { validateName, validatePhoneNumber } from '../middleware/validationMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/sign-up',
    validateName,
    validatePhoneNumber,
    signUp
);

router.post('/sign-in',
    validatePhoneNumber,
    signIn
);

router.get('/',
    authMiddleware,
    auth
);

router.post('/increase-progress',
    authMiddleware,
    increaseProgress
);

router.get('/logout',
    authMiddleware,
    logout
);

export default router;