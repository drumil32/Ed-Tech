import express from 'express';
import authRoutes from './authRoutes.js';
import liveClassBookingRoutes from './liveClassBookingRoutes.js';
import requestACallRoutes from './requestACallRoutes.js';
import enrollStudentRoutes from './enrollStudentRoutes.js';
import counsellingSessionRoutes from './counsellingSessionRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/enroll', enrollStudentRoutes)
router.use('/book-live-class', liveClassBookingRoutes);
router.use('/request-a-call', requestACallRoutes);
router.use('/counselling-session', counsellingSessionRoutes);

export default router;