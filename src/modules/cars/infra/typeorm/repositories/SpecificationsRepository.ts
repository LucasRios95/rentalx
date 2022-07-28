import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specifications";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    private static INSTANCE: SpecificationsRepository;

    constructor() {
        this.repository = getRepository(Specification);
    }

    // public static getInstance(): SpecificationsRepository {
    //     if (!SpecificationsRepository.INSTANCE) {                                => Padrão Singleton
    //         SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    //     }

    //     return SpecificationsRepository.INSTANCE;
    // }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);

        console.log(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}
export { SpecificationsRepository };
