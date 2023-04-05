import { inject, injectable } from "tsyringe";

import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppErrors } from "@shared/errors/AppErrors";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private userstokenRepository: IUsersTokenRepository
    ) {}

    async execute({ token, password }: IRequest) {
        const userToken = this.userstokenRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppErrors("Invalid Token");
        }
    }
}

export { ResetPasswordUserUseCase };
