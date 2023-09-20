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
        const car = await carsRepositoryInMemory.create({
            name:"Test",
            description: "test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 20,
            category_id:"1234",
            brand:"car test"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there's another rental opened for da same user", async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand",
        });

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        await expect(createRentalUseCase.execute({
                user_id: "12345",
                car_id: "45687878",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppErrors("this user already has a rental in progress"));
    });

    it("Should not be able to create a new rental if there's another rental opened for the same car", async () => {
        const car = await carsRepositoryInMemory.create({
            name:"Test",
            description: "test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 20,
            category_id:"1234",
            brand:"car test"
        });
        
        await createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

       await expect(createRentalUseCase.execute({
                user_id: "321",
                car_id: car.id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppErrors("This Car Unavaliable, please try another car"));
    });

    it("Should not be able to create a new rental with an invalid return time", async () => {
        
       await expect(createRentalUseCase.execute({
                user_id: "321",
                car_id: "4321",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppErrors("The rental cannot have less than 24 hours of duration"));
    });
});
