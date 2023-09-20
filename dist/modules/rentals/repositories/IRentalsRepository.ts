import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ICreateRentalsDTO } from "../dtos/ICreateRentalsDTO";

interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: ICreateRentalsDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
