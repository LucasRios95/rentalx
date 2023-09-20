import { ICreateCarsDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarsDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    list(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateStatus(id: string, avaliable: boolean): Promise<void>;
}

export { ICarsRepository };
