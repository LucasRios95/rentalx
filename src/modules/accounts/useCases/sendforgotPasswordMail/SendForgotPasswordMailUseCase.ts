import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppErrors } from "@shared/errors/AppErrors";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
<<<<<<< HEAD
        const templatePath = resolve(
            __dirname, 
            "..", 
            "..", 
            "views", 
            "emails", 
=======

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
            "forgotPassword.hbs"
        );

        if (!user) {
            throw new AppErrors("User does not exists");
        }

        const token = uuidV4();
        const expiresIn = this.dateProvider.adddHours(1);

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expiration_day: expiresIn,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };
<<<<<<< HEAD
        
=======

>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
