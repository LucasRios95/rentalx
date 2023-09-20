import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all avaliable cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Honda Fit",
            description: "Conforto para você e sua família",
            daily_rate: 185.0,
            license_plate: "HED8909",
            fine_amount: 22.0,
            brand: "Honda",
            category_id: "34cdabf5-b21b-4bf1-a203-b0f10bf66221",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaliable cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Honda Fit",
            description: "Conforto para você e sua família",
            daily_rate: 185.0,
            license_plate: "HED8909",
            fine_amount: 22.0,
            brand: "Honda",
            category_id: "34cdabf5-b21b-4bf1-a203-b0f10bf66221",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Honda",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaliable cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Honda Fit",
            description: "Conforto para você e sua família",
            daily_rate: 185.0,
            license_plate: "HED8909",
            fine_amount: 22.0,
            brand: "Honda",
            category_id: "34cdabf5-b21b-4bf1-a203-b0f10bf66221",
        });

        const cars = await listCarsUseCase.execute({
            name: "Honda Fit",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all avaliable cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Honda Fit",
            description: "Conforto para você e sua família",
            daily_rate: 185.0,
            license_plate: "HED8909",
            fine_amount: 22.0,
            brand: "Honda",
            category_id: "34cdabf5-b21b-4bf1-a203-b0f10bf66221",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "34cdabf5-b21b-4bf1-a203-b0f10bf66221",
        });

        expect(cars).toEqual([car]);
    });
});
