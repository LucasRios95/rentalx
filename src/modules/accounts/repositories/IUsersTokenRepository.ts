import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { User } from "../infra/typeorm/entities/User";
import { UserTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokenRepository {
    create({
        expiration_day,
        user_id,
        refresh_token,
    }: ICreateUsersTokenDTO): Promise<UserTokens>;

    findByUserId(user_id: string, refresh_token: string): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;
}

export { IUsersTokenRepository };
