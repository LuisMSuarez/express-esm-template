import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { PingService } from "../services/ping.service.js";
import { Request, Response } from "express";

@injectable()
export class PingController {
  constructor(@inject(TYPES.PingService) private pingService: PingService) {}

  handlePing(_req: Request, res: Response) {
    res.json(this.pingService.getMessage());
  }
}
