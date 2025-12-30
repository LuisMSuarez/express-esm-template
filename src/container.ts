import { Container } from "inversify";
import { TYPES } from "./types.js";
import { PingService } from "./services/ping.service.js";
import { PingController } from "./controllers/ping.controller.js";

const container = new Container();

container.bind(TYPES.PingService).to(PingService);
container.bind(TYPES.PingController).to(PingController);

export { container };
