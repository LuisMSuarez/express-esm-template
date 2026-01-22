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

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping endpoint
 *     description: Returns a pong message with an optional name parameter
 *     tags:
 *       - Ping
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           minLength: 1
 *         required: false
 *         description: Optional name to include in the response
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 *                 name:
 *                   type: string
 *                   example: anonymous
 *             examples:
 *               withName:
 *                 value:
 *                   message: pong
 *                   name: John
 *               withoutName:
 *                 value:
 *                   message: pong
 *                   name: anonymous
 */
router.get("/ping", validate(PingRequestSchema), controller.handlePing);

export default router;
