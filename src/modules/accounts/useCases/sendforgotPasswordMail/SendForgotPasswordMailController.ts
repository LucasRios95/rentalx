import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotMailPasswordUseCase = container.resolve(
            SendForgotPasswordMailUseCase
        );

        await sendForgotMailPasswordUseCase.execute(email);

        return response.send();
    }
}

export { SendForgotPasswordMailController };
