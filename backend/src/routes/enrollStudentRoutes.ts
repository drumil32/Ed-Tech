import express from 'express';
import { validatePhoneNumber } from '../middleware/validationMiddleware.js';
import { enrollStudent } from '../controllers/enrollStudentController.js';
import { adminAuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',adminAuthMiddleware,validatePhoneNumber,enrollStudent);

export default router;