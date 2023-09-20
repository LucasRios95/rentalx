import { Category } from "../infra/typeorm/entities/Category";

// DTO => Data Transfer Object: Usado para realizar a transferência de dados entre camadas e suas classes
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
