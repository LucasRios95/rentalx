import { NextFunction, Request, Response } from "express";
import * as redis from "redis";
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
    points: 5,
    duration: 5,
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await redisClient.connect();

        if (process.env.NODE_ENV === 'production') {
            await limiter.consume(request.ip);
        }
        return next();

    } catch (err) {
        if (err instanceof Error && err.message === "Not enough points") {
            return next();
        }
        
        throw new AppErrors("Too many requests", 429);
    } finally {
        redisClient.disconnect();
    }
}
