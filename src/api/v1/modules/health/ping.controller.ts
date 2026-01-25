import { inject } from "inversify";
import { TYPES } from "../../../../types.js";
import { Request, Response } from "express";
import { z } from "zod";
import { PingRequestSchema } from "../../../../schemas/ping.schema.js";
import { IPingService } from "./ping.service.interface.js";

type PingRequest = z.infer<typeof PingRequestSchema>;

export class PingController {
  constructor(@inject(TYPES.PingService) private pingService: IPingService) {}

  handlePing = (req: Request, res: Response) => {
    const { name } = (req.validated as PingRequest).query;

    req.log.info("Ping endpoint called");

    res.json({
      ...this.pingService.getMessage(),
      name: name ?? "anonymous",
    });
  };
}
