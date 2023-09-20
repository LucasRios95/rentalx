import { UsersRepositoryInMemory } from "@modules/accounts/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppErrors } from "@shared/errors/AppErrors";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokenRepository: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory


describe("Send Forgot Password E-mail", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        usersTokenRepository = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository, 
            usersTokenRepository, 
            dateProvider,
            mailProvider,
        );
    });

    it("should be able to send a forgot password mail to an user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepository.create({
            driver_license: "123456",
            email: "lucashrios@rentalx.com",
            name: "lucashrios",
            password: "12345"
        });

        await sendForgotPasswordMailUseCase.execute("lucashrios@rentalx.com");


        expect(sendMail).toHaveBeenCalled();
         
    });
    
    it("should not be able to send a forgot password mail to an user that not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("lucas@teste.com.br")
        ).rejects.toBeInstanceOf(AppErrors);
    });

    it("should be able to create an user token", async () => {
        const generateTokenMail = jest.spyOn(usersTokenRepository, "create");

        await usersRepository.create({
            driver_license: "654321",
            email: "lucashrios95@rentalx.com",
            name: "lucashrios",
            password: "12345"
        });

        await sendForgotPasswordMailUseCase.execute("lucashrios95@rentalx.com");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});