import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { redisClient } from "../config/redis.js";
import { EventType } from "../types.js";

export const eventController = expressAsyncHandler(async (req: Request, res: Response) => {
    const { type } = req.body;
    const _id = "abc";
    if (type == EventType.COURSE_SYLLABUS_VIEW) {
        redisClient.incr(_id + type);
    } else if (type == EventType.LOCK_BUTTON_CLICK) {
        redisClient.incr(_id + type);
    }
    res.status(200);
});