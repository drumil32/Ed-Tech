import express from 'express';
import authRoutes from './authRoutes.js';
import liveClassBookingRoutes from './liveClassBookingRoutes.js';
import requestACallRoutes from './requestACallRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/book-live-class', liveClassBookingRoutes);
router.use('/request-a-call', requestACallRoutes);

export default router;
