import express, { Request, Response } from "express";
import { getAllFaqByType } from "../controllers/faqController.js";

const router = express.Router();

router.get('/:faqType',getAllFaqByType);

export default router;