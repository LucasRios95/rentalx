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
<<<<<<< HEAD

    findByRefreshToken(refresh_token: string): Promise<UserTokens>; 
=======
    findByRefreshToken(token: string): Promise<UserTokens>;
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
}

export { IUsersTokenRepository };
