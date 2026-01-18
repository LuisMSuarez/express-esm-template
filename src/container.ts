import { Container } from "inversify";
import { TYPES } from "./types.js";
import { PingService } from "./services/ping.service.js";
import { PingController } from "./controllers/ping.controller.js";
import { IPingService } from "./services/ping.service.interface.js";

// Setup of IOC container
const container = new Container();

// Registration of classes
container
  .bind<IPingService>(TYPES.PingService)
  .to(PingService)
  .inRequestScope();
container.bind(TYPES.PingController).to(PingController).inRequestScope();

export { container };
