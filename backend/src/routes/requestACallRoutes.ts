import express from 'express';

import { validateName, validatePhoneNumber } from '../middleware/validationMiddleware.js';
import { requestACall } from '../controllers/requestACallController.js';

const router = express.Router();

router.post('/', validateName, validatePhoneNumber, requestACall);

export default router;
