import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppErrors } from "@shared/errors/AppErrors";

interface IRequest {
    name: string;
    description: string;
}

/**
 * [x] - Definir o tipo do retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */

@injectable()
class CreateCategoryUseCase {
    // private categoriesRepository: CategoriesRepository; // precisa ser private para conseguirmos ter acesso aos atributos e métodos da classe

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {
        // this.categoriesRepository = categoriesRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppErrors("Category already exists");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
