import "reflect-metadata";
import "dotenv/config";
import cors from "cors";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";





import "@shared/container";
import upload from "@config/upload";
import { AppErrors } from "@shared/errors/AppErrors";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import createConnection from "../typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();

app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});

app.use(express.json());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`)); //express.static -> realiza leitura arquivos estáticos na aplicação

app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
        if(error.status === 429 || error.status === 500) {
            return true;
        }
        return false;
    }
}));

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppErrors) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });

        next();
    }
);

export { app };
