import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;
            const authenticateUserCase = container.resolve(
                AuthenticateUserUseCase
            );

            const token = await authenticateUserCase.execute({
                email,
                password,
            });

            return response.json(token);
        } catch (error) {
            return response.status(401).json({ error: error.message });
        }
    }
}

export { AuthenticateUserController };
