import { Router } from "express";

import { DevolutionRentaLController } from "@modules/rentals/dervolutionRental/DevolutionRentalController";
import { CreateRentalController } from "@modules/rentals/useCases/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentaLController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

rentalsRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalsRoutes };
