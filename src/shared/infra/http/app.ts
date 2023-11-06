import "reflect-metadata";
import "dotenv/config";
import cors from "cors";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";


import "@shared/container";
import { AppErrors } from "@shared/errors/AppErrors";

import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import { router } from "./routes";
import upload from "@config/upload";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder }/avatar`)); //express.static -> realiza leitura arquivos estáticos na aplicação

app.use("/cars", express.static(`${upload.tmpFolder }/cars`));

app.use(cors());

app.use(router);

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
