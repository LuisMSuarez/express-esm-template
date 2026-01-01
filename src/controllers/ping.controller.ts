import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { PingService } from "../services/ping.service.js";
import { Request, Response } from "express";
import { z } from "zod";
import { PingRequestSchema } from "../schemas/ping.schema.js";

type PingRequest = z.infer<typeof PingRequestSchema>;

@injectable()
export class PingController {
  constructor(@inject(TYPES.PingService) private pingService: PingService) {}

  handlePing(req: Request, res: Response) {
    const { name } = (req.validated as PingRequest).query;

    req.log.info("Ping endpoint called");

    res.json({
      ...this.pingService.getMessage(),
      name: name ?? "anonymous",
    });
  }
}
