import { Router } from "express";
import { simulateChangesController } from "../controllers/dev.controller.js";

const devRoutes = Router();

devRoutes.post("/simulate-changes", simulateChangesController);

export default devRoutes;