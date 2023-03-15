
import auth from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppErrors } from "@shared/errors/AppErrors";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    sub: string;
    email: string;
}

injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,

        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider

    ){}

    async execute(token: string){
      const { email, sub } = verify(token, auth.secret_refresh_token ) as IPayload;

      const user_id = sub;

      const userTokens = await this.usersTokenRepository.findByUserId(user_id, token);

      if(!userTokens) {
        throw new AppErrors("Invalid Refresh token");
      }

      await this.usersTokenRepository.deleteById(userTokens.id);

      const expiration_day = this.dayjsDateProvider.addDays(
        auth.expiration_day_refresh_token
    );

      const refresh_token = sign({ email }, auth.secret_refresh_token, {
        subject: sub,
        expiresIn: auth.expires_in_refresh_token
    });
    
    await this.usersTokenRepository.create({
        expiration_day,
        refresh_token,
        user_id
    });
        
    return refresh_token;
    
    }
}

export {RefreshTokenUseCase};