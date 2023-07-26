import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
// import { deleteFile } from "@utils/file";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider,
    ) { }

    async execute({ user_id, avatarFile }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        await this.storageProvider.save(avatarFile, "avatar");

        if (user.avatar) {
            // await deleteFile(`./tmp/avatar/${user.avatar}`);
            await this.storageProvider.delete(avatarFile, "avatar");
        }

        user.avatar = avatarFile;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };

// Adicionar Coluna avatar na tabela users
// Configuração Upload Multer
// Refatorar Usuário com a Coluna Avatar
// Criar Regra de Negócio do Upload
// Criar Controller
