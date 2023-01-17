import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppErrors } from "@shared/errors/AppErrors";

import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "4321",
            expected_return_date: dayAdd24Hours,
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there's another rental opened for da same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "4321",
                expected_return_date: dayAdd24Hours,
            });

            const rental = await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "4321",
                expected_return_date: dayAdd24Hours,
            });

            console.log(rental);
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("Should not be able to create a new rental if there's another rental opened for the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "4321",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "4321",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("Should not be able to create a new rental with an invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "4321",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });
});
