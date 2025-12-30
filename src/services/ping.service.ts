import { injectable } from "inversify";

@injectable()
export class PingService {
  getMessage() {
    return { message: "pong" };
  }
}
