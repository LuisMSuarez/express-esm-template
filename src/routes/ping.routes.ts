import { Router } from "express";
import { container } from "../container.js";
import { TYPES } from "../types.js";
import { PingController } from "../controllers/ping.controller.js";
import { validate } from "../middleware/validate.js";
import { PingRequestSchema } from "../schemas/ping.schema.js";
import { IPingService } from "../services/ping.service.interface.js";

const router = Router();
const pingService = container.get<IPingService>(TYPES.PingService);
const controller = new PingController(pingService);

router.get("/ping", validate(PingRequestSchema), controller.handlePing);

export default router;
