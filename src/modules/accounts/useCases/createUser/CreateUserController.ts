import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, password, email, driver_license } = request.body;

            const createUserUseCase = container.resolve(CreateUserUseCase);

            await createUserUseCase.execute({
                name,
                password,
                email,
                driver_license,
            });

            return response.status(201).send();
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

export { CreateUserController };
