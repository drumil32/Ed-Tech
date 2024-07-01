import express from 'express';
import { validatePhoneNumber } from '../middleware/validationMiddleware.js';
import { enrollStudent } from '../controllers/enrollStudentController.js';

const router = express.Router();

router.post('/',validatePhoneNumber,enrollStudent);

export default router;