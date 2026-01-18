import { injectable } from "inversify";
import { IPingService, PingResponse } from "./ping.service.interface.js";

@injectable()
export class PingService implements IPingService {
  getMessage(): PingResponse {
    return { message: "pong" };
  }
}
