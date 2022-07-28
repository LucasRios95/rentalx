import { hash } from "bcryptjs"; // utilizamos o bcryptjs ao invés do bcrypt pois o segundo apresenta problemas de compatiblidade na compilação do pacote no docker
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppErrors } from "@shared/errors/AppErrors";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUsersDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        const passwordHash = await hash(password, 8);

        if (userAlreadyExists) {
            throw new AppErrors("User already exists");
        }

        this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
