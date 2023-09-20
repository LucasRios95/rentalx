import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppErrors } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Corolla",
            description: "motor v8",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Toyota",
            category_id: "Sedan",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an existent license_plate", async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                name: "Civic",
                description: "motor v6",
                daily_rate: 1000,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Toyota",
                category_id: "Sedan",
            });

            await createCarUseCase.execute({
                name: "Corolla",
                description: "motor v8",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Toyota",
                category_id: "Sedan",
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("should not be able to create a car with avaliable = true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Corolla",
            description: "motor v8",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Toyota",
            category_id: "Sedan",
        });

        console.log(car);

        expect(car.avaliable).toBe(true);
    });
});
