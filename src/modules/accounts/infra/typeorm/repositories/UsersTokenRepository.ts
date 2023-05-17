import { getRepository, Repository } from "typeorm";

import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

import { UserTokens } from "../entities/UsersTokens";

class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UserTokens>;

    public constructor() {
        this.repository = getRepository(UserTokens);
    }
<<<<<<< HEAD
   
=======

>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
    async create({
        expiration_day,
        user_id,
        refresh_token,
    }: ICreateUsersTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expiration_day,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserId(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
<<<<<<< HEAD
        const userToken = await this.repository.findOne({
            refresh_token,
        });

        return userToken;
    }
    
=======
        const userTokens = await this.repository.findOne({
            refresh_token,
        });

        return userTokens;
    }
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
}

export { UsersTokenRepository };
