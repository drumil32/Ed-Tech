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
    res.status(200).send("events is successful");
});

export const getData = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
        const data = await redisClient.hGetAll('key');
        const data1 = await redisClient.hVals('key');
        const data3 = await redisClient.get("abc" + EventType.COURSE_SYLLABUS_VIEW);
        const data4 = await redisClient.get("abc" + EventType.LOCK_BUTTON_CLICK);
        const data5 = await redisClient.sendCommand(['HGETALL', 'key']);
        const data6 = await redisClient.keys('*');
        res.status(200).json({ data, data1, data3, data4, data5, data6 });
    } catch (error) {
        console.error('Error fetching keys:', error);
        res.status(500).json({ message: error });
    }
});