import { Specification } from "@modules/cars/infra/typeorm/entities/Specifications";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        await this.specifications.push(specification);

        console.log(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );

        return allSpecifications;
    }
}

export { SpecificationRepositoryInMemory };
