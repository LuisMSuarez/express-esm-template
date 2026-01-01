import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { PingService } from "../services/ping.service.js";
import { Request, Response } from "express";

@injectable()
export class PingController {
  constructor(@inject(TYPES.PingService) private pingService: PingService) {}

  handlePing(req: Request, res: Response) {
    req.log.info("Ping endpoint called");
    res.json(this.pingService.getMessage());
  }
}
