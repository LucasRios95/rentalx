import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
<<<<<<< HEAD
        const {email} = request.body;
=======
        const { email } = request.body;
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd

        const sendForgotMailPasswordUseCase = container.resolve(
            SendForgotPasswordMailUseCase
        );

        await sendForgotMailPasswordUseCase.execute(email);

        return response.send();
    }
}

export { SendForgotPasswordMailController };
