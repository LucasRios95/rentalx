import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UsersTokens";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository{
    userTokens: UserTokens[] = [];

    async create({ expiration_day, user_id, refresh_token, }: ICreateUsersTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expiration_day,
            refresh_token,
            user_id
        });

        this.userTokens.push(userToken);

        return userToken;
    }
    
    async findByUserId(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.userTokens.find(
            userToken => userToken.user_id === user_id && 
            userToken.refresh_token === refresh_token
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(userToken => userToken.id === id);

        this.userTokens.splice(this.userTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
       const userToken = this.userTokens.find(
            userToken => userToken.refresh_token === refresh_token
        );

        return userToken;
    }
    
}

export { UsersTokenRepositoryInMemory }