import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppErrors } from "@shared/errors/AppErrors";

// import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppErrors("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "4612d9d8a7e9b56dedda17d9d171d985"
        ) as IPayload; // Ipayload pois o desestruturação do sub não é reconhecida sem a interface

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppErrors("User does not exists", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppErrors("Invalid Token", 401);
    }
}
