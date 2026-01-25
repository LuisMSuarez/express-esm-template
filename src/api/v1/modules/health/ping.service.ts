import { injectable } from "inversify";
import { IPingService } from "./ping.service.interface.js";
import { PingResponse } from "../../../../contracts/pingResponse.js";

@injectable()
export class PingService implements IPingService {
  getMessage(): PingResponse {
    return { message: "pong" };
  }
}
