<<<<<<< HEAD
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppErrors } from "@shared/errors/AppErrors";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
=======
import { inject, injectable } from "tsyringe";

import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppErrors } from "@shared/errors/AppErrors";
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokenRepository")
<<<<<<< HEAD
        private usersTokenRepository: IUsersTokenRepository,
        
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

    ){}

    async execute({token, password}: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if(!userToken) {
            throw new AppErrors("Invalid Token");
        }


        if(this.dateProvider.compareIfBefore(
                userToken.expiration_day, 
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppErrors("Token has expired");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id);
=======
        private userstokenRepository: IUsersTokenRepository
    ) {}

    async execute({ token, password }: IRequest) {
        const userToken = this.userstokenRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppErrors("Invalid Token");
        }
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
    }
}

export { ResetPasswordUserUseCase };
<<<<<<< HEAD

=======
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
