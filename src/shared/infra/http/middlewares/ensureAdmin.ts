import { Request, Response, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppErrors } from "@shared/errors/AppErrors";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppErrors("User is not admin!");
    }

    return next();
}
