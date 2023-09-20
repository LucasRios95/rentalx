interface ICreateUsersTokenDTO {
    user_id: string;
    expiration_day: Date;
    refresh_token: string;
}

export { ICreateUsersTokenDTO }