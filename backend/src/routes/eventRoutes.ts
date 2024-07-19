import express from 'express';
import { eventController, getData } from '../controllers/eventController.js';

const router = express.Router();

router.post('/',eventController);
router.get('/',getData);

export default router;