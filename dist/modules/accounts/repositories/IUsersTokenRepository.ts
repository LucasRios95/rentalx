import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokenRepository {
    create({
        expiration_day,
        user_id,
        refresh_token,
    }: ICreateUsersTokenDTO): Promise<UserTokens>;
    findByUserId(user_id: string, refresh_token: string): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>; 
}

export { IUsersTokenRepository };
