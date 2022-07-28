import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    public constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
        id,
        avatar,
    }: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            id,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository };
