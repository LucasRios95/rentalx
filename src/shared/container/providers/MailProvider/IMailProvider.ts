interface IMailProvider {
    sendMail(
<<<<<<< HEAD
        to: string, 
        subject: string, 
        variables: any, 
=======
        to: string,
        subject: string,
        variables: any,
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
        path: string
    ): Promise<void>;
}

export { IMailProvider };
