import { NextFunction, Request, Response } from "express";
import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { AppErrors } from "@shared/errors/AppErrors";

const redisClient = redis.createClient({
    legacyMode: true,

    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    }
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 10, //10 requests
    duration: 1, //per 1 second by ip
});



export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await limiter.consume(request.ip);

        return next(); 
    } catch (err) {
        throw new AppErrors("Too many requests", 429);
    }
}
