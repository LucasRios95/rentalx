import { Request, Response } from "express";
import { container } from "tsyringe";
<<<<<<< HEAD
=======

>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
<<<<<<< HEAD
        const { token } = request.query;
        const { password } = request.body; 

        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

        resetPasswordUserUseCase.execute({ token: `${token}`, password });
=======
        const { token, password } = request.body;

        const resetPasswordUserUseCase = container.resolve(
            ResetPasswordUserUseCase
        );

        await resetPasswordUserUseCase.execute({ token, password });
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd

        return response.send();
    }
}

<<<<<<< HEAD
export { ResetPasswordUserController };
=======
export { ResetPasswordUserController };
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
