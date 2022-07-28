import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppErrors } from "@shared/errors/AppErrors";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };

    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Usuario Existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppErrors("E-mail or Password incorrect");
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppErrors("E-mail or Password incorrect");
        }

        // Gerar jsonwebtoken
        const token = sign({}, "4612d9d8a7e9b56dedda17d9d171d985", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenAuthenticated: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };

        return tokenAuthenticated;
    }
}

export { AuthenticateUserUseCase };
