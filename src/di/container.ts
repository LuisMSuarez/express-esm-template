import { Container } from "inversify";
import { TYPES } from "../types.js";
import { IPingService } from "../api/v1/modules/health/ping.service.interface.js";
import { PingService } from "../api/v1/modules/health/ping.service.js";

// Setup of IOC container
const container = new Container();

// Registration of classes
container
  .bind<IPingService>(TYPES.PingService)
  .to(PingService)
  .inSingletonScope();

export { container };
