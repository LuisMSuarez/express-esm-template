import { inject } from "inversify";
import { TYPES } from "../types.js";
import { Request, Response } from "express";
import { z } from "zod";
import { PingRequestSchema } from "../schemas/ping.schema.js";
import { IPingService } from "../services/ping.service.interface.js";

type PingRequest = z.infer<typeof PingRequestSchema>;

export class PingController {
  constructor(@inject(TYPES.PingService) private pingService: IPingService) {}

  handlePing = (req: Request, res: Response) => {
    const { name } = (req.validated as PingRequest).query;
    const google_apiKey: string = "AIzaSyA-EXAMPLEKEY1234567890abcdefghi";
    const session_key: string = "zyx987";
    const GITHUB_TOKEN = "ghp_FAKE1234567890TOKEN";
    console.log(session_key);

    req.log.info("Ping endpoint called");

    res.json({
      ...this.pingService.getMessage(),
      name: name ?? "anonymous",
    });
  };
}
