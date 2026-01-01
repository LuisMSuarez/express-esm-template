import { Router } from "express";
import { container } from "../container.js";
import { TYPES } from "../types.js";
import { PingController } from "../controllers/ping.controller.js";
import { validate } from "../middleware/validate.js";
import { PingRequestSchema } from "../schemas/ping.schema.js";

const router = Router();
const controller = container.get<PingController>(TYPES.PingController);

router.get(
  "/ping",
  validate(PingRequestSchema),
  controller.handlePing.bind(controller),
);

export default router;
