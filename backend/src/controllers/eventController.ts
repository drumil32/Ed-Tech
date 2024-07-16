import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { redisClient } from "../config/redis.js";

export const eventController = expressAsyncHandler(async (req: Request, res: Response) => {
    const {type} = req.body;

    try{
        redisClient.incr(type);
    }catch(error){
        console.log(error);
    }

    res.status(200);
});