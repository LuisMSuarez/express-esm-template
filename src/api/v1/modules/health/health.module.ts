import { Container } from "inversify";
import { TYPES } from "../../../../core/types/types.js";
import { PingService } from "./ping.service.js";

export const HealthModule = {
  register(container: Container) {
    container.bind(TYPES.PingService).to(PingService).inSingletonScope();
  },
};
