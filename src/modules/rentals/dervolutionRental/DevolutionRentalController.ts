import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUsecase } from "./DevolutionRentalUseCase";

class DevolutionRentaLController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params; // sobrescreve variável id acima

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUsecase
        );

        const rental = await devolutionRentalUseCase.execute({
            id,
            user_id,
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentaLController };
